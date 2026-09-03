import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import * as THREE from 'three';

interface TShirtModelProps {
  color: string;
  autoRotate?: boolean;
  scale?: number;
}

export const TShirtModel: React.FC<TShirtModelProps> = ({
  color,
  autoRotate = true,
  scale = 1.6,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    }
  });

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness: 0.55,
    metalness: 0.05,
  });

  return (
    <Center>
      <group ref={groupRef} scale={scale} dispose={null}>
        <mesh castShadow receiveShadow position={[0, 0.1, 0]} material={material}>
          <boxGeometry args={[1.4, 1.6, 0.25]} />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.85, 0.55, 0]} rotation={[0, 0, 0.3]} material={material}>
          <boxGeometry args={[0.55, 0.5, 0.25]} />
        </mesh>
        <mesh castShadow receiveShadow position={[0.85, 0.55, 0]} rotation={[0, 0, -0.3]} material={material}>
          <boxGeometry args={[0.55, 0.5, 0.25]} />
        </mesh>
        <mesh castShadow position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]} material={material}>
          <torusGeometry args={[0.28, 0.08, 8, 16, Math.PI]} />
        </mesh>
        <mesh position={[0, 0.35, 0.13]}>
          <circleGeometry args={[0.12, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      </group>
    </Center>
  );
};
