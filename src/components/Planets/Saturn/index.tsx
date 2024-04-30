import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import SaturnMap from '/assets/saturn/saturn.jpg';
import SaturnRings from './rings';

const Saturn = () => {
  const saturnRef = useRef<Group>();
  const planetRef = useRef<Group>();
  const saturnPositionRef = useRef(new Vector3(850, 0, 0));
  const [saturnTexture] = useTexture<string[]>([SaturnMap]);

  useFrame(({ clock }) => {
    if (saturnRef.current) {
      const angle = clock.getElapsedTime() * 0.175;
      const distance = 850;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      saturnRef.current.position.set(x, 0, z);
      saturnRef.current.rotation.y += 0.02;
      saturnPositionRef.current = saturnRef.current.position;
    }
  });

  return (
    <group ref={saturnRef as React.MutableRefObject<Group>}>
      <group
        ref={planetRef as React.MutableRefObject<Group>}
        rotation={[Math.PI / 4, 0, 0]}
      >
        {/* Rotate the planet 45 degrees around the x-axis */}
        <mesh receiveShadow>
          <sphereGeometry args={[48, 32, 32]} />
          <meshPhongMaterial map={saturnTexture} />
        </mesh>
      </group>
      <SaturnRings />
    </group>
  );
};

export default Saturn;
