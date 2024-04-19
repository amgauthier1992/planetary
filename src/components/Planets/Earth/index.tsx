import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import EarthMap from '../../../assets/earth.jpg';

const Earth = () => {
  const earthRef = useRef<Mesh>();
  const earthTexture = useTexture<string>(EarthMap);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001; // Increase rotation speed for y-axis
      earthRef.current.rotation.x += 0.005; // Increase rotation speed for x-axis
      earthRef.current.rotation.z += 0.005; // Increase rotation speed for z-axis
    }
  });

  return (
    <mesh ref={earthRef as React.MutableRefObject<Mesh>}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

export default Earth;
