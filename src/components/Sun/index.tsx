import React, { useRef } from 'react';
import { useHelper, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, PointLight, PointLightHelper } from 'three';
import SunMap from '/assets/sun/sun.jpg';

const Sun = () => {
  const sunRef = useRef<Mesh>();
  const pointLightRef = useRef<PointLight | null>(null);
  const sunTexture = useTexture<string>(SunMap);

  useHelper(pointLightRef as React.MutableRefObject<PointLight>, PointLightHelper, 1, 'white');

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y -= 0.002;
    }
  });

  return (
    <mesh
      ref={sunRef as React.MutableRefObject<Mesh>}
      position={[0, 0, 0]}
    >
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[20, 32, 32]} />
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <pointLight
        // castShadow
        intensity={10000}
        ref={pointLightRef}
      />
    </mesh>
  );
};

export default Sun;
