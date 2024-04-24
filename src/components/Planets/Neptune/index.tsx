import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import NeptuneMap from '/assets/neptune/neptune.jpg';

const Neptune = () => {
  const neptuneRef = useRef<Group>();
  const neptunePositionRef = useRef(new Vector3(190, 0, 0));

  const [neptuneTexture] = useTexture<string[]>([NeptuneMap]);

  useFrame(({ clock }) => {
    if (neptuneRef.current) {
      const angle = clock.getElapsedTime() * 0.3;
      const distance = 190;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      neptuneRef.current.position.set(x, 0, z);
      neptuneRef.current.rotation.y += 0.02;
      neptunePositionRef.current = neptuneRef.current.position;
    }
  });

  return (
    <group ref={neptuneRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        receiveShadow
      >
        <sphereGeometry args={[6, 32, 32]} />
        <meshPhongMaterial map={neptuneTexture} />
      </mesh>
    </group>
  );
};

export default Neptune;
