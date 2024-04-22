import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import MoonMap from '../../../assets/earth/moon-map.jpg';

const Moon = () => {
  const moonRef = useRef<Mesh>();
  const moonTexture = useTexture<string>(MoonMap);

  useFrame(({ clock }) => {
    if (moonRef.current) {
      //Orbit
      moonRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.2) * 4;
      moonRef.current.position.z = Math.cos(clock.getElapsedTime() * 0.2) * 4;
      //Axis
      moonRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh
      castShadow
      ref={moonRef as React.MutableRefObject<Mesh>}
      position={[4, 0, 0]}
    >
      <sphereGeometry args={[0.33, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  );
};

export default Moon;
