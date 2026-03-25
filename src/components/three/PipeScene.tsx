"use client";

/* ─────────────────────────────────────────────────────────────────────────
   PipeScene — 3D pipe cross-section for the Hero (Enhanced)
   Rotating cut-away: outer shell, inner bore, wireframe, molten weld seam,
   scanning laser, floating sparks, pulsing glow. R3F + Drei.
   ───────────────────────────────────────────────────────────────────────── */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";

/* ── Colors ───────────────────────────────────────────────────────────── */
const STEEL   = new THREE.Color("#8FA3B8");
const NAVY    = new THREE.Color("#2A3E72");
const MOLTEN  = new THREE.Color("#E85E22");
const MOLTEN_BRIGHT = new THREE.Color("#FF7A3D");
const EMBER   = new THREE.Color("#FF4400");

/* ── Pipe Cross-Section Mesh ─────────────────────────────────────────── */
function PipeCrossSection() {
  const groupRef = useRef<THREE.Group>(null);

  /* Slow continuous rotation */
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x += delta * 0.04;
    }
  });

  /* Tube geometry — pipe with wall thickness */
  const outerRadius = 1.6;
  const innerRadius = 1.2;
  const pipeLength = 2.2;
  const segments = 64;

  /* Create the pipe shape (annular cross-section extruded) */
  const pipeShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const hole = new THREE.Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: pipeLength,
      bevelEnabled: false,
      steps: 1,
      curveSegments: segments,
    }),
    []
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.4, 0, 0.15]}>
      {/* Main pipe body — dark metallic, slightly more visible */}
      <mesh position={[0, 0, -pipeLength / 2]}>
        <extrudeGeometry args={[pipeShape, extrudeSettings]} />
        <meshStandardMaterial
          color={NAVY}
          metalness={0.9}
          roughness={0.18}
          transparent
          opacity={0.82}
        />
      </mesh>

      {/* Wireframe overlay — brighter technical drawing aesthetic */}
      <mesh position={[0, 0, -pipeLength / 2]}>
        <extrudeGeometry args={[pipeShape, extrudeSettings]} />
        <meshBasicMaterial
          color={STEEL}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Inner bore glow ring — front face — brighter */}
      <mesh position={[0, 0, pipeLength / 2]}>
        <ringGeometry args={[innerRadius - 0.03, innerRadius + 0.06, segments]} />
        <meshBasicMaterial
          color={MOLTEN_BRIGHT}
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Outer edge ring — front face */}
      <mesh position={[0, 0, pipeLength / 2]}>
        <ringGeometry args={[outerRadius - 0.03, outerRadius + 0.03, segments]} />
        <meshBasicMaterial
          color={STEEL}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Cross-section face — semi-transparent to show depth */}
      <mesh position={[0, 0, pipeLength / 2 + 0.001]}>
        <ringGeometry args={[innerRadius, outerRadius, segments]} />
        <meshStandardMaterial
          color={STEEL}
          metalness={0.75}
          roughness={0.25}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Pulsing weld seam — runs along the top of the pipe ─────── */}
      <WeldSeam outerRadius={outerRadius} pipeLength={pipeLength} />

      {/* ── Scanning laser line — moves along pipe length ──────────── */}
      <ScanLine outerRadius={outerRadius} innerRadius={innerRadius} pipeLength={pipeLength} />

      {/* Dimension lines — technical drawing accent */}
      <AnimatedDimensionLine
        start={[-outerRadius - 0.4, 0, pipeLength / 2]}
        end={[outerRadius + 0.4, 0, pipeLength / 2]}
        color={MOLTEN}
        delay={0}
      />
      <AnimatedDimensionLine
        start={[0, -outerRadius - 0.4, pipeLength / 2]}
        end={[0, outerRadius + 0.4, pipeLength / 2]}
        color={STEEL}
        delay={0.5}
      />
    </group>
  );
}

/* ── Weld Seam — pulsing orange line along pipe top ──────────────────── */
function WeldSeam({
  outerRadius,
  pipeLength,
}: {
  outerRadius: number;
  pipeLength: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      // Pulse between 0.3 and 0.85
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2.5) * 0.275;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, outerRadius + 0.005, 0]}
      rotation={[0, 0, 0]}
    >
      <boxGeometry args={[0.03, 0.01, pipeLength]} />
      <meshBasicMaterial
        color={MOLTEN_BRIGHT}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

/* ── Scan Line — ring that travels along the pipe ────────────────────── */
function ScanLine({
  outerRadius,
  innerRadius,
  pipeLength,
}: {
  outerRadius: number;
  innerRadius: number;
  pipeLength: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Travel from back to front over 4 seconds, loop
      const t = (state.clock.elapsedTime % 4) / 4;
      meshRef.current.position.z = -pipeLength / 2 + t * pipeLength;
      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      // Fade in and out at edges
      const edge = Math.sin(t * Math.PI);
      mat.opacity = edge * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <ringGeometry args={[outerRadius - 0.01, outerRadius + 0.04, 64]} />
      <meshBasicMaterial
        color={MOLTEN_BRIGHT}
        transparent
        opacity={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Animated Dimension Line — fades in pulsing ──────────────────────── */
function AnimatedDimensionLine({
  start,
  end,
  color,
  delay,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: THREE.Color;
  delay: number;
}) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const lineRef = useRef<any>(null);

  useFrame((state) => {
    if (lineRef.current) {
      const mat = lineRef.current.material;
      if (mat && "opacity" in mat) {
        const t = state.clock.elapsedTime + delay;
        mat.opacity = 0.15 + Math.sin(t * 1.5) * 0.1;
      }
    }
  });

  const points = useMemo(
    () => [start, end] as [number, number, number][],
    [start, end]
  );

  return (
    <Line
      ref={lineRef as never}
      points={points}
      color={color}
      transparent
      opacity={0.22}
      lineWidth={1}
    />
  );
}

/* ── Floating Sparks / Particles — industrial ambient ────────────────── */
function Sparks({ count = 40 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        // Spread around the pipe area
        x: (Math.random() - 0.5) * 6,
        y: (Math.random() - 0.5) * 5,
        z: (Math.random() - 0.5) * 4,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        scale: 0.008 + Math.random() * 0.018,
      });
    }
    return arr;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      // Gentle float upward + slight horizontal drift
      const yOff = ((t * p.speed + p.phase) % 5) - 2.5;
      dummy.position.set(
        p.x + Math.sin(t * 0.3 + p.phase) * 0.2,
        p.y + yOff,
        p.z + Math.cos(t * 0.2 + p.phase) * 0.15
      );
      // Fade based on y position
      const fade = 1 - Math.abs(yOff) / 2.5;
      dummy.scale.setScalar(p.scale * Math.max(0.2, fade));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color={MOLTEN_BRIGHT}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

/* ── Pulsing Point Light — orbits the pipe ───────────────────────────── */
function OrbitingLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.elapsedTime * 0.5;
      lightRef.current.position.set(
        Math.cos(t) * 3,
        Math.sin(t * 0.7) * 1.5,
        Math.sin(t) * 3 + 1
      );
      // Pulse intensity
      lightRef.current.intensity = 0.6 + Math.sin(state.clock.elapsedTime * 1.8) * 0.25;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      color="#FF6B35"
      intensity={0.7}
      distance={10}
      decay={2}
    />
  );
}

/* ── Exported Scene ──────────────────────────────────────────────────── */
export default function PipeScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Lighting — stronger, warmer for vibrancy */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[3, 4, 5]}
          intensity={1.0}
          color="#C8D4E2"
        />
        <directionalLight
          position={[-2, -1, 3]}
          intensity={0.5}
          color="#E85E22"
        />
        <pointLight
          position={[0, 0, 3]}
          intensity={0.7}
          color="#E85E22"
          distance={8}
          decay={2}
        />

        {/* Orbiting warm accent light */}
        <OrbitingLight />

        {/* Floating sparks — industrial ambient particles */}
        <Sparks count={35} />

        {/* Floating motion — gentle, mechanical feel */}
        <Float
          speed={1.4}
          rotationIntensity={0.18}
          floatIntensity={0.35}
          floatingRange={[-0.12, 0.12]}
        >
          <PipeCrossSection />
        </Float>
      </Canvas>
    </div>
  );
}
