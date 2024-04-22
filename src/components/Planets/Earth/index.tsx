import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import EarthMap from '/assets/earth/earth.jpg';
import EarthNormalMap from '/assets/earth/earth-normal-map.jpg';
import EarthSpecularMap from '/assets/earth/earth-specular-map.jpg';
import EarthDisplacementMap from '/assets/earth/earth-displacement-map.jpg';
import Moon from './Moon';

const Earth = () => {
  const earthRef = useRef<Mesh>();
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture<
    string[]
  >([EarthMap, EarthNormalMap, EarthSpecularMap, EarthDisplacementMap]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      <mesh
        receiveShadow
        ref={earthRef as React.MutableRefObject<Mesh>}
      >
        <sphereGeometry args={[1, 32, 32]} />
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
