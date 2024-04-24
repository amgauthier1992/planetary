import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import UranusMap from '/assets/uranus/uranus.jpg';

const Uranus = () => {
  const uranusRef = useRef<Group>();
  const uranusPositionRef = useRef(new Vector3(160, 0, 0));

  const [uranusTexture] = useTexture<string[]>([UranusMap]);

  useFrame(({ clock }) => {
    if (uranusRef.current) {
      const angle = clock.getElapsedTime() * 0.4;
      const distance = 160;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.rotation.y += 0.02;
      uranusPositionRef.current = uranusRef.current.position;
    }
  });

  return (
    <group ref={uranusRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        receiveShadow
      >
        <sphereGeometry args={[7, 32, 32]} />
        <meshPhongMaterial map={uranusTexture} />
      </mesh>
    </group>
  );
};

export default Uranus;
