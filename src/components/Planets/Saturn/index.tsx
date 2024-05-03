import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import SaturnMap from '/assets/saturn/saturn.jpg';
import SaturnRings from './rings';

const Saturn = () => {
  const saturnRef = useRef<Group>();
  const planetRef = useRef<Group>();
  const saturnPositionRef = useRef(new Vector3(850, 0, 0));
  const [saturnTexture] = useTexture<string[]>([SaturnMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

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

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (saturnRef.current) {
      saturnRef.current.userData = {
        atmosphere: [
          {
            element: 'Hydrogen',
            percentage: 96.3,
          },
          {
            element: 'Helium',
            percentage: 3.25,
          },
        ],
        diameter: '116,464',
        gravity: 10.44,
        mass: '5.6834e26',
        moons: 82,
        name: 'Saturn',
        orbitalPeriod: '10,767.5',
        rotationalPeriod: 0.44,
        sunDistance: '1.429e9',
        surfaceTemp: -139,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (saturnRef?.current?.userData) {
      const planetData = saturnRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group
      onClick={handleSelectPlanet}
      ref={saturnRef as React.MutableRefObject<Group>}
    >
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
