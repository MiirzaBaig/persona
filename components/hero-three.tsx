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

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.45, 2),
      new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    );
    group.add(shell);

    const ring = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.TorusKnotGeometry(1.58, 0.12, 144, 12, 2, 3)),
      new THREE.LineBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.12,
      }),
    );
    ring.rotation.x = Math.PI / 2.8;
    group.add(ring);

    const particleCount = 170;
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
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0x2563eb,
        size: 0.035,
        transparent: true,
        opacity: 0.28,
      }),
    );
    group.add(particles);

    const pointer = new THREE.Vector2(0, 0);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();

      const isMobile = width < 768;
      group.position.set(isMobile ? 0.7 : 2.15, isMobile ? -0.55 : -0.2, 0);
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
        ring.rotation.z = frame * 0.22;
        particles.rotation.y = -frame * 0.14;
      }

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      particleGeometry.dispose();
      shell.geometry.dispose();
      ring.geometry.dispose();
      shell.material.dispose();
      ring.material.dispose();
      particles.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-80 [mask-image:linear-gradient(90deg,transparent,black_24%,black_100%)] dark:opacity-70"
    />
  );
}
