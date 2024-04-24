import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import JupiterMap from '/assets/jupiter/jupiter.jpg';

const Jupiter = () => {
  const jupiterRef = useRef<Group>();
  const jupiterPositionRef = useRef(new Vector3(100, 0, 0));

  const [jupiterTexture] = useTexture<string[]>([JupiterMap]);

  useFrame(({ clock }) => {
    if (jupiterRef.current) {
      const angle = clock.getElapsedTime() * 0.7;
      const distance = 100;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      jupiterRef.current.position.set(x, 0, z);
      jupiterRef.current.rotation.y += 0.02;
      jupiterPositionRef.current = jupiterRef.current.position;
    }
  });

  return (
    <group ref={jupiterRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        receiveShadow
      >
        <sphereGeometry args={[10, 32, 32]} />
        <meshPhongMaterial map={jupiterTexture} />
      </mesh>
    </group>
  );
};

export default Jupiter;
