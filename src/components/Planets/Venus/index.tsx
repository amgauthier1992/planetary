import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import VenusMap from '/assets/venus/venus.jpg';

const Venus = () => {
  const venusRef = useRef<Mesh>();
  const venusPositionRef = useRef(new Vector3(265, 0, 0));
  const [venusTexture] = useTexture<string[]>([VenusMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  useFrame(({ clock }) => {
    if (venusRef.current) {
      const angle = clock.getElapsedTime() * 0.375;
      const distance = 265;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      venusRef.current.position.set(x, 0, z);
      venusRef.current.rotation.y += 0.02;
      venusPositionRef.current = venusRef.current.position;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (venusRef.current) {
      venusRef.current.userData = {
        atmosphere: [
          {
            element: 'Carbon Dioxide',
            percentage: 96.5,
          },
          {
            element: 'Nitrogen',
            percentage: 3.5,
          },
        ],
        diameter: 12104,
        gravity: 8.87,
        mass: '4.8675e24',
        moons: 0,
        name: 'Venus',
        orbitalPeriod: 225,
        rotationalPeriod: 243,
        sunDistance: '108.2e6',
        surfaceTemp: 464,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (venusRef?.current?.userData) {
      const planetData = venusRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <mesh
      //castShadow
      onClick={handleSelectPlanet}
      receiveShadow
      ref={venusRef as React.MutableRefObject<Mesh>}
    >
      <sphereGeometry args={[23, 32, 32]} />
      <meshPhongMaterial map={venusTexture} />
    </mesh>
  );
};

export default Venus;
