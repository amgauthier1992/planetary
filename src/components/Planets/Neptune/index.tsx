import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import NeptuneMap from '/assets/neptune/neptune.jpg';

const Neptune = () => {
  const neptuneRef = useRef<Group>();
  const neptunePositionRef = useRef(new Vector3(1250, 0, 0));
  const [neptuneTexture] = useTexture<string[]>([NeptuneMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  useFrame(({ clock }) => {
    if (neptuneRef.current) {
      const angle = clock.getElapsedTime() * 0.075;
      const distance = 1250;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      neptuneRef.current.position.set(x, 0, z);
      neptuneRef.current.rotation.y += 0.02;
      neptunePositionRef.current = neptuneRef.current.position;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (neptuneRef.current) {
      neptuneRef.current.userData = {
        atmosphere: [
          {
            element: 'Hydrogen',
            percentage: 80,
          },
          {
            element: 'Helium',
            percentage: 19,
          },
          {
            element: 'Other Gases',
            percentage: 1,
          },
        ],
        diameter: '49,244',
        gravity: 11.15,
        mass: '1.024e26',
        moons: 14,
        name: 'Neptune',
        orbitalPeriod: '60,225',
        rotationalPeriod: 0.67,
        sunDistance: '4.495e9',
        surfaceTemp: -201,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (neptuneRef?.current?.userData) {
      const planetData = neptuneRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group ref={neptuneRef as React.MutableRefObject<Group>}>
      <mesh
        onClick={handleSelectPlanet}
        //castShadow
        receiveShadow
      >
        <sphereGeometry args={[38, 32, 32]} />
        <meshPhongMaterial map={neptuneTexture} />
      </mesh>
    </group>
  );
};

export default Neptune;
