"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 6000;
const SPHERE_RADIUS = 2.5;
const WARP_INNER_RADIUS = 0.18;
const WARP_OUTER_RADIUS = 4.6;

// Morph cycle: hold sphere -> morph -> hold warp -> morph back.
// 4400ms segments = 2 headline rotations (2200ms each) so the shape
// change lands in rhythm with the rotating hero text.
const HOLD_MS = 3200;
const MORPH_MS = 1200;
const CYCLE_MS = (HOLD_MS + MORPH_MS) * 2;

type Palette = {
  neutral: THREE.Color;
  accent: [THREE.Color, THREE.Color, THREE.Color];
  opacity: number;
};

const LIGHT_PALETTE: Palette = {
  neutral: new THREE.Color(0x27272a),
  accent: [
    new THREE.Color(0x1d4ed8),
    new THREE.Color(0x6d28d9),
    new THREE.Color(0xbe185d),
  ],
  opacity: 1,
};

const DARK_PALETTE: Palette = {
  neutral: new THREE.Color(0xd4d4d8),
  accent: [
    new THREE.Color(0x93c5fd),
    new THREE.Color(0xc4b5fd),
    new THREE.Color(0xf9a8d4),
  ],
  opacity: 1,
};

// Direction of the tinted edge (right side, slightly toward camera),
// mirroring Mantle's blue -> violet -> magenta rim.
const ACCENT_DIRECTION = new THREE.Vector3(0.92, 0.1, 0.38).normalize();
const ACCENT_CONE = Math.cos((52 * Math.PI) / 180);

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Sphere formation: points sit on latitude bands (structured dotted rows,
 * like Mantle's globe) instead of a random scatter.
 */
function buildSphereFormation(count: number) {
  const positions = new Float32Array(count * 3);
  const bands = 56;

  const weights: number[] = [];
  let totalWeight = 0;
  for (let band = 0; band < bands; band += 1) {
    const phi = (Math.PI * (band + 0.5)) / bands;
    const weight = Math.sin(phi);
    weights.push(weight);
    totalWeight += weight;
  }

  let index = 0;
  for (let band = 0; band < bands && index < count; band += 1) {
    const phi = (Math.PI * (band + 0.5)) / bands;
    const isLast = band === bands - 1;
    const bandCount = isLast
      ? count - index
      : Math.round((count * weights[band]) / totalWeight);
    const thetaOffset = Math.random() * Math.PI * 2;

    for (let dot = 0; dot < bandCount && index < count; dot += 1) {
      const theta = thetaOffset + (Math.PI * 2 * dot) / Math.max(bandCount, 1);
      // Tiny jitter keeps the bands from reading as a perfect grid.
      const jitterPhi = phi + (Math.random() - 0.5) * 0.02;
      const radius = SPHERE_RADIUS * (1 + (Math.random() - 0.5) * 0.012);

      positions[index * 3] = radius * Math.sin(jitterPhi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.cos(jitterPhi);
      positions[index * 3 + 2] = radius * Math.sin(jitterPhi) * Math.sin(theta);
      index += 1;
    }
  }

  return positions;
}

/**
 * Warp formation: each particle's sphere direction is snapped to a coarse
 * angular grid, so particles sharing a cell line up into dotted radial rays
 * bursting from the center. Morphing is then mostly radial motion, and the
 * accent edge stays on the same side in both formations.
 */
function buildWarpFormation(spherePositions: Float32Array, count: number) {
  const positions = new Float32Array(count * 3);
  const thetaSteps = 30;
  const phiSteps = 16;
  const direction = new THREE.Vector3();

  for (let index = 0; index < count; index += 1) {
    direction
      .set(
        spherePositions[index * 3],
        spherePositions[index * 3 + 1],
        spherePositions[index * 3 + 2],
      )
      .normalize();

    const theta = Math.atan2(direction.z, direction.x);
    const phi = Math.acos(THREE.MathUtils.clamp(direction.y, -1, 1));
    const quantTheta =
      (Math.round((theta / (Math.PI * 2)) * thetaSteps) / thetaSteps) *
      Math.PI *
      2;
    const quantPhi =
      (Math.round((phi / Math.PI) * phiSteps) / phiSteps) * Math.PI;

    const sinPhi = Math.sin(quantPhi);
    const rayX = sinPhi * Math.cos(quantTheta);
    const rayY = Math.cos(quantPhi);
    const rayZ = sinPhi * Math.sin(quantTheta);

    const radius =
      WARP_INNER_RADIUS +
      Math.random() * (WARP_OUTER_RADIUS - WARP_INNER_RADIUS);

    positions[index * 3] = rayX * radius;
    positions[index * 3 + 1] = rayY * radius;
    positions[index * 3 + 2] = rayZ * radius;
  }

  return positions;
}

/**
 * Per-particle accent value: -1 for neutral dots, 0..1 gradient position for
 * dots inside the accent cone on the sphere's edge.
 */
function buildAccentValues(spherePositions: Float32Array, count: number) {
  const accents = new Float32Array(count);
  const direction = new THREE.Vector3();

  for (let index = 0; index < count; index += 1) {
    direction
      .set(
        spherePositions[index * 3],
        spherePositions[index * 3 + 1],
        spherePositions[index * 3 + 2],
      )
      .normalize();

    const alignment = direction.dot(ACCENT_DIRECTION);
    if (alignment > ACCENT_CONE) {
      const depth = (alignment - ACCENT_CONE) / (1 - ACCENT_CONE);
      // Vertical position inside the cone spreads dots across the gradient.
      const vertical = THREE.MathUtils.clamp(
        direction.y / Math.sqrt(1 - ACCENT_CONE * ACCENT_CONE) / 2 + 0.5,
        0,
        1,
      );
      accents[index] = THREE.MathUtils.clamp(
        vertical * 0.7 + depth * 0.3,
        0,
        1,
      );
    } else {
      accents[index] = -1;
    }
  }

  return accents;
}

function makeDotSprite() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.72, "rgba(255,255,255,0.55)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function HeroThree() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
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

    const spherePositions = buildSphereFormation(PARTICLE_COUNT);
    const warpPositions = buildWarpFormation(spherePositions, PARTICLE_COUNT);
    const accentValues = buildAccentValues(spherePositions, PARTICLE_COUNT);
    const brightness = new Float32Array(PARTICLE_COUNT);
    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      brightness[index] = 0.92 + Math.random() * 0.16;
    }

    const geometry = new THREE.BufferGeometry();
    const positionAttr = new THREE.BufferAttribute(
      spherePositions.slice(),
      3,
    );
    positionAttr.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute("position", positionAttr);
    const colorAttr = new THREE.BufferAttribute(
      new Float32Array(PARTICLE_COUNT * 3),
      3,
    );
    geometry.setAttribute("color", colorAttr);

    const sprite = makeDotSprite();
    const material = new THREE.PointsMaterial({
      size: 0.042,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const scratchColor = new THREE.Color();
    const applyPalette = (palette: Palette) => {
      const colors = colorAttr.array as Float32Array;
      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const accent = accentValues[index];
        if (accent < 0) {
          scratchColor.copy(palette.neutral);
          scratchColor.multiplyScalar(brightness[index]);
        } else if (accent < 0.5) {
          scratchColor
            .copy(palette.accent[0])
            .lerp(palette.accent[1], accent * 2);
          scratchColor.multiplyScalar(0.96 + brightness[index] * 0.08);
        } else {
          scratchColor
            .copy(palette.accent[1])
            .lerp(palette.accent[2], (accent - 0.5) * 2);
          scratchColor.multiplyScalar(0.96 + brightness[index] * 0.08);
        }
        colors[index * 3] = scratchColor.r;
        colors[index * 3 + 1] = scratchColor.g;
        colors[index * 3 + 2] = scratchColor.b;
      }
      colorAttr.needsUpdate = true;
      material.opacity = palette.opacity;
    };

    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      applyPalette(isDark ? DARK_PALETTE : LIGHT_PALETTE);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    applyTheme();

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

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
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    let animationId = 0;
    let lastMorph = -1;
    const startTime = performance.now();

    const morphAt = (elapsed: number) => {
      const t = elapsed % CYCLE_MS;
      if (t < HOLD_MS) return 0;
      if (t < HOLD_MS + MORPH_MS) {
        return easeInOutCubic((t - HOLD_MS) / MORPH_MS);
      }
      if (t < HOLD_MS + MORPH_MS + HOLD_MS) return 1;
      return 1 - easeInOutCubic((t - (HOLD_MS * 2 + MORPH_MS)) / MORPH_MS);
    };

    const animate = () => {
      const elapsed = performance.now() - startTime;

      group.rotation.y += 0.0016;
      group.rotation.x += (pointer.y * 0.16 - group.rotation.x) * 0.035;
      group.rotation.z += (pointer.x * 0.1 - group.rotation.z) * 0.035;

      const morph = morphAt(elapsed);
      if (morph !== lastMorph) {
        const output = positionAttr.array as Float32Array;
        for (let index = 0; index < PARTICLE_COUNT * 3; index += 1) {
          output[index] =
            spherePositions[index] +
            (warpPositions[index] - spherePositions[index]) * morph;
        }
        positionAttr.needsUpdate = true;
        lastMorph = morph;
      }

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_16%,black_100%)]"
    />
  );
}
