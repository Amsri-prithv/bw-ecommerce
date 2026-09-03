import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { TShirtModel } from './TShirtModel';

interface TShirtCanvasProps {
  color: string;
  autoRotate?: boolean;
  height?: string;
  showHints?: boolean;
}

export const TShirtCanvas: React.FC<TShirtCanvasProps> = ({
  color,
  autoRotate = true,
  height = 'h-[420px]',
  showHints = true,
}) => {
  return (
    <div
      className={`w-full ${height} relative bg-gradient-to-b from-brand-midGray to-brand-black rounded-xl border border-brand-borderGray overflow-hidden`}
    >
      {showHints && (
        <div className="absolute bottom-4 left-4 z-10 text-[10px] text-brand-lightGray space-y-0.5 pointer-events-none">
          <p>✦ Auto-rotates • Drag to rotate</p>
          <p>✦ Scroll to zoom</p>
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [0, 0.5, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.45} />
        <spotLight
          position={[8, 12, 8]}
          angle={0.25}
          penumbra={0.8}
          intensity={1.2}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight position={[-6, 4, -4]} intensity={0.4} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[1, 1.5, 0.3]} />
              <meshStandardMaterial color="#333" wireframe />
            </mesh>
          }
        >
          <TShirtModel color={color} autoRotate={autoRotate} />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.45}
            scale={8}
            blur={2.5}
            far={3}
          />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enableZoom
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3.2}
          target={[0, 0.2, 0]}
        />
      </Canvas>
    </div>
  );
};
