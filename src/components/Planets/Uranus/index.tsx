import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import UranusMap from '/assets/uranus/uranus.jpg';

const Uranus = () => {
  const uranusRef = useRef<Group>();
  const uranusPositionRef = useRef(new Vector3(1050, 0, 0));
  const [uranusTexture] = useTexture<string[]>([UranusMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  useFrame(({ clock }) => {
    if (uranusRef.current) {
      const angle = clock.getElapsedTime() * 0.125;
      const distance = 1050;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      uranusRef.current.position.set(x, 0, z);
      uranusRef.current.rotation.y += 0.02;
      uranusPositionRef.current = uranusRef.current.position;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (uranusRef.current) {
      uranusRef.current.userData = {
        atmosphere: [
          {
            element: 'Hydrogen',
            percentage: 82.5,
          },
          {
            element: 'Helium',
            percentage: 10.2,
          },
          {
            element: 'Other Gases',
            percentage: 2.3,
          },
        ],
        diameter: 50724,
        gravity: 8.69,
        mass: '8.681e25',
        moons: 27,
        name: 'Uranus',
        orbitalPeriod: '30,660',
        rotationalPeriod: 0.72,
        sunDistance: '4.495e9',
        surfaceTemp: -201,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (uranusRef?.current?.userData) {
      const planetData = uranusRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group ref={uranusRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        onClick={handleSelectPlanet}
        receiveShadow
      >
        <sphereGeometry args={[42, 32, 32]} />
        <meshPhongMaterial map={uranusTexture} />
      </mesh>
    </group>
  );
};

export default Uranus;
