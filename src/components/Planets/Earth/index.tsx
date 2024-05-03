import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Clock, Group, Mesh, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';

import EarthMap from '/assets/earth/earth.jpg';
import EarthNormalMap from '/assets/earth/earth-normal-map.jpg';
import EarthSpecularMap from '/assets/earth/earth-specular-map.jpg';
import EarthDisplacementMap from '/assets/earth/earth-displacement-map.jpg';
import Moon from './Moon';

const Earth = () => {
  const earthMeshRef = useRef<Mesh>();
  const earthGroupRef = useRef<Group>();
  const earthPositionRef = useRef(new Vector3(365, 0, 0)); // Reference to the Earth's position vector
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture<
    string[]
  >([EarthMap, EarthNormalMap, EarthSpecularMap, EarthDisplacementMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  useFrame(({ clock }: { clock: Clock }) => {
    if (earthGroupRef.current) {
      const angle = clock.getElapsedTime() * 0.325;
      const distance = 365;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      earthGroupRef.current.position.set(x, 0, z);
      earthGroupRef.current.rotation.y += 0.02;
      earthPositionRef.current = earthGroupRef.current.position;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (earthMeshRef.current) {
      earthMeshRef.current.userData = {
        atmosphere: [
          { element: 'Nitrogen', percentage: 78 },
          { element: 'Oxygen', percentage: 21 },
          { element: 'Carbon Dioxide', percentage: 0.04 },
        ],
        diameter: '12,742',
        gravity: 9.81,
        mass: '5.972e24',
        moons: 1,
        name: 'Earth',
        orbitalPeriod: 365.25,
        rotationalPeriod: 0.997,
        sunDistance: '149.6e6',
        surfaceTemp: 15,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (earthMeshRef?.current?.userData) {
      const planetData = earthMeshRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group ref={earthGroupRef as React.MutableRefObject<Group>}>
      <mesh
        castShadow
        receiveShadow
        ref={earthMeshRef as React.MutableRefObject<Mesh>}
        onClick={handleSelectPlanet}
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
