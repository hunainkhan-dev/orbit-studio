import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A faceted crystal that turns with the cursor — the studio's signature object.
function Crystal() {
  const mesh = useRef(null);
  const wire = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x = mouse.current.y * 0.4;
    mesh.current.rotation.z = mouse.current.x * 0.25;
    if (wire.current) {
      wire.current.rotation.copy(mesh.current.rotation);
    }
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.9, 0]} />
        <meshStandardMaterial color="#ec4899" roughness={0.25} metalness={0.4} flatShading />
      </mesh>
      <mesh ref={wire} scale={1.008}>
        <icosahedronGeometry args={[1.9, 0]} />
        <meshBasicMaterial color="#f5f3f0" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function Sculpture() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.6} />
      <pointLight position={[-5, -3, 2]} intensity={1.4} color="#ec4899" />
      <pointLight position={[4, -4, -3]} intensity={0.8} color="#8b5cf6" />
      <Suspense fallback={null}>
        <Crystal />
      </Suspense>
    </Canvas>
  );
}
