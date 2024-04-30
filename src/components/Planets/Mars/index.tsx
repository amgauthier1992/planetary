import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import MarsMap from '/assets/mars/mars.jpg';

const Mars = () => {
  const marsRef = useRef<Group>();
  const marsPositionRef = useRef(new Vector3(455, 0, 0));

  const [marsTexture] = useTexture<string[]>([MarsMap]);

  useFrame(({ clock }) => {
    if (marsRef.current) {
      const angle = clock.getElapsedTime() * 0.275;
      const distance = 455;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      marsRef.current.position.set(x, 0, z);
      marsRef.current.rotation.y += 0.02;
      marsPositionRef.current = marsRef.current.position;
    }
  });

  return (
    <group ref={marsRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        receiveShadow
      >
        <sphereGeometry args={[16, 32, 32]} />
        <meshPhongMaterial map={marsTexture} />
      </mesh>
      {/* Mars Moons? */}
    </group>
  );
};

export default Mars;
