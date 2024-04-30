import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import EarthMap from '/assets/earth/earth.jpg';
import EarthNormalMap from '/assets/earth/earth-normal-map.jpg';
import EarthSpecularMap from '/assets/earth/earth-specular-map.jpg';
import EarthDisplacementMap from '/assets/earth/earth-displacement-map.jpg';
import Moon from './Moon';

const Earth = () => {
  const earthRef = useRef<Group>();
  const earthPositionRef = useRef(new Vector3(365, 0, 0)); // Reference to the Earth's position vector

  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture<
    string[]
  >([EarthMap, EarthNormalMap, EarthSpecularMap, EarthDisplacementMap]);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      const angle = clock.getElapsedTime() * 0.325;
      const distance = 365;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthRef.current.position.set(x, 0, z);
      earthRef.current.rotation.y += 0.02;
      earthPositionRef.current = earthRef.current.position;
    }
  });

  return (
    <group ref={earthRef as React.MutableRefObject<Group>}>
      <mesh
        castShadow
        receiveShadow
        onClick={() => {
          alert('Earth click');
        }}
      >
        <sphereGeometry args={[25, 32, 32]} />
        <meshPhongMaterial
          displacementMap={earthDisplacementMap}
          displacementScale={0.05}
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
        />
      </mesh>
      <Moon />
    </group>
  );
};

export default Earth;
