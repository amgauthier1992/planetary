import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import VenusMap from '/assets/venus/venus.jpg';

const Venus = () => {
  const venusRef = useRef<Mesh>();
  const venusPositionRef = useRef(new Vector3(48, 0, 0));

  const [venusTexture] = useTexture<string[]>([VenusMap]);

  useFrame(({ clock }) => {
    if (venusRef.current) {
      const angle = clock.getElapsedTime() * 1.3;
      const distance = 48;
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
      <sphereGeometry args={[3.5, 32, 32]} />
      <meshPhongMaterial map={venusTexture} />
    </mesh>
  );
};

export default Venus;
