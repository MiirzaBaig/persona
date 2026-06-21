"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.domElement.dataset.threeHero = "true";
    renderer.domElement.className = "h-full w-full";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.45, 2),
      shellMat,
    );
    group.add(shell);

    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const innerGlow = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.2, 3),
      innerGlowMat,
    );
    group.add(innerGlow);

    const ringMat = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.25,
    });
    const ring = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(1.58, 0.12, 144, 12, 2, 3)),
      ringMat,
    );
    ring.rotation.x = Math.PI / 2.8;
    group.add(ring);

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 1.8 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeometry, particleMat);
    group.add(particles);

    // Theme-aware color updates
    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      if (isDark) {
        shellMat.color.setHex(0x60a5fa);
        shellMat.opacity = 0.35;
        innerGlowMat.color.setHex(0x3b82f6);
        innerGlowMat.opacity = 0.1;
        ringMat.color.setHex(0x60a5fa);
        ringMat.opacity = 0.2;
        particleMat.color.setHex(0x93c5fd);
        particleMat.opacity = 0.55;
      } else {
        shellMat.color.setHex(0x1d4ed8);
        shellMat.opacity = 0.5;
        innerGlowMat.color.setHex(0x1e40af);
        innerGlowMat.opacity = 0.15;
        ringMat.color.setHex(0x1d4ed8);
        ringMat.opacity = 0.3;
        particleMat.color.setHex(0x2563eb);
        particleMat.opacity = 0.7;
      }
    };

    applyTheme();

    // Watch for theme changes
    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const pointer = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();

      const isMobile = width < 768;
      group.position.set(isMobile ? 0.7 : 3.2, isMobile ? -0.55 : -0.1, 0);
      group.scale.setScalar(isMobile ? 0.72 : 1);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    let frame = 0;
    let animationId = 0;

    const animate = () => {
      frame += 0.01;
      if (!prefersReducedMotion) {
        group.rotation.y += 0.0028;
        group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.035;
        group.rotation.z += (pointer.x * 0.12 - group.rotation.z) * 0.035;
        shell.rotation.y = frame * 0.36;
        innerGlow.rotation.y = -frame * 0.2;
        ring.rotation.z = frame * 0.22;
        particles.rotation.y = -frame * 0.14;
      }

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      particleGeometry.dispose();
      shell.geometry.dispose();
      innerGlow.geometry.dispose();
      ring.geometry.dispose();
      shellMat.dispose();
      innerGlowMat.dispose();
      ringMat.dispose();
      particleMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-90 [mask-image:linear-gradient(90deg,transparent,black_24%,black_100%)] dark:opacity-100"
    />
  );
}
