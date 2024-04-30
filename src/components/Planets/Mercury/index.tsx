import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import MercuryMap from '/assets/mercury/mercury.jpg';

const Mercury = () => {
  const mercuryRef = useRef<Mesh>();
  const mercuryPositionRef = useRef(new Vector3(175, 0, 0));

  const [mercuryTexture] = useTexture<string[]>([MercuryMap]);

  useFrame(({ clock }) => {
    if (mercuryRef.current) {
      const angle = clock.getElapsedTime() * 0.425;
      const distance = 175;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      mercuryRef.current.position.set(x, 0, z);
      mercuryRef.current.rotation.y += 0.02;
      mercuryPositionRef.current = mercuryRef.current.position;
    }
  });

  return (
    <mesh
      //castShadow
      receiveShadow
      ref={mercuryRef as React.MutableRefObject<Mesh>}
    >
      <sphereGeometry args={[12, 32, 32]} />
      <meshPhongMaterial map={mercuryTexture} />
    </mesh>
  );
};

export default Mercury;
