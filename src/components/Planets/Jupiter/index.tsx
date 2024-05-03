import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import JupiterMap from '/assets/jupiter/jupiter.jpg';

const Jupiter = () => {
  const jupiterRef = useRef<Group>();
  const jupiterPositionRef = useRef(new Vector3(625, 0, 0));
  const [jupiterTexture] = useTexture<string[]>([JupiterMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  useFrame(({ clock }) => {
    if (jupiterRef.current) {
      const angle = clock.getElapsedTime() * 0.225;
      const distance = 625;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      jupiterRef.current.position.set(x, 0, z);
      jupiterRef.current.rotation.y += 0.02;
      jupiterPositionRef.current = jupiterRef.current.position;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (jupiterRef.current) {
      jupiterRef.current.userData = {
        atmosphere: [
          {
            element: 'Hydrogen',
            percentage: 89.8,
          },
          {
            element: 'Helium',
            percentage: 10.2,
          },
        ],
        diameter: 139822,
        gravity: 24.79,
        mass: '1.8982e27',
        moons: 79,
        name: 'Jupiter',
        orbitalPeriod: '4,343.5',
        rotationalPeriod: 0.41,
        sunDistance: '778.6e6',
        surfaceTemp: -108,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (jupiterRef?.current?.userData) {
      const planetData = jupiterRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group ref={jupiterRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        onClick={handleSelectPlanet}
        receiveShadow
      >
        <sphereGeometry args={[60, 32, 32]} />
        <meshPhongMaterial map={jupiterTexture} />
      </mesh>
    </group>
  );
};

export default Jupiter;
