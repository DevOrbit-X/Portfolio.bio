import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Spin({ children, speed = 0.4 }: { children: React.ReactNode; speed?: number }) {
  const r = useRef<Mesh>(null);
  useFrame((s, d) => {
    if (!r.current) return;
    r.current.rotation.x += Math.min(d, 0.05) * speed;
    r.current.rotation.y += Math.min(d, 0.05) * speed * 1.3;
    r.current.position.x += (s.pointer.x * 0.4 - r.current.position.x) * 0.02;
  });
  return <mesh ref={r}>{children}</mesh>;
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.75]}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 0]} scale={[10, 10, 1]} />
        <Lightformer intensity={1.5} color="#3cc" position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[20, 1, 1]} />
      </Environment>
      <Float speed={2} floatIntensity={1.5}>
        <Spin><icosahedronGeometry args={[1.4, 8]} /><MeshDistortMaterial color="#f0a830" distort={0.35} speed={2} metalness={0.6} roughness={0.15} /></Spin>
      </Float>
      <Float speed={3} floatIntensity={2} position={[-2.4, 1.3, -1]}>
        <Spin speed={0.8}><torusKnotGeometry args={[0.4, 0.14, 120, 16]} /><meshStandardMaterial color="#e5533d" metalness={0.7} roughness={0.2} /></Spin>
      </Float>
      <Float speed={2.5} floatIntensity={2} position={[2.3, -1.2, -0.5]}>
        <Spin speed={0.6}><octahedronGeometry args={[0.6]} /><meshStandardMaterial color="#3cc4c8" metalness={0.8} roughness={0.1} /></Spin>
      </Float>
    </Canvas>
  );
}
