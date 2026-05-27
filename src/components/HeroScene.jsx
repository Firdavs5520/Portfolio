import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function PortfolioMark() {
  const group = useRef(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.58}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.45, 2.45, 0.32]} />
          <meshStandardMaterial color="#0f2b67" metalness={0.48} roughness={0.24} />
        </mesh>
        <mesh position={[-0.35, 0.26, 0.24]}>
          <boxGeometry args={[0.36, 1.22, 0.18]} />
          <meshStandardMaterial color="#f8fbff" metalness={0.18} roughness={0.18} />
        </mesh>
        <mesh position={[0.16, 0.78, 0.25]}>
          <boxGeometry args={[1.12, 0.28, 0.18]} />
          <meshStandardMaterial color="#38bdf8" metalness={0.18} roughness={0.16} />
        </mesh>
        <mesh position={[0.06, 0.25, 0.26]}>
          <boxGeometry args={[0.88, 0.24, 0.18]} />
          <meshStandardMaterial color="#93c5fd" metalness={0.18} roughness={0.2} />
        </mesh>
        <mesh position={[1.45, -0.92, 0.05]} rotation={[0.45, 0.2, 0.1]}>
          <torusGeometry args={[0.46, 0.045, 20, 64]} />
          <meshStandardMaterial color="#67e8f9" emissive="#0ea5e9" emissiveIntensity={0.48} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div
      data-gsap="hero-orbit"
      className="pointer-events-none absolute right-[9%] top-[24%] z-0 hidden h-[250px] w-[250px] opacity-72 lg:block xl:right-[14%] xl:h-[310px] xl:w-[310px]"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.4], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 4, 5]} intensity={2.1} />
        <pointLight position={[-3, -2, 4]} intensity={1.6} color="#38bdf8" />
        <Sparkles count={28} scale={[4, 3, 2]} size={2.2} speed={0.28} color="#7dd3fc" />
        <PortfolioMark />
      </Canvas>
    </div>
  );
}
