import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import VenusMap from '/assets/venus/venus.jpg';

const Venus = () => {
  const venusRef = useRef<Mesh>();
  const venusPositionRef = useRef(new Vector3(265, 0, 0));

  const [venusTexture] = useTexture<string[]>([VenusMap]);

  useFrame(({ clock }) => {
    if (venusRef.current) {
      const angle = clock.getElapsedTime() * 0.375;
      const distance = 265;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      venusRef.current.position.set(x, 0, z);
      venusRef.current.rotation.y += 0.02;
      venusPositionRef.current = venusRef.current.position;
    }
  });

  return (
    <mesh
      //castShadow
      receiveShadow
      ref={venusRef as React.MutableRefObject<Mesh>}
    >
      <sphereGeometry args={[23, 32, 32]} />
      <meshPhongMaterial map={venusTexture} />
    </mesh>
  );
};

export default Venus;
