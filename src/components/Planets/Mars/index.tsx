import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import MarsMap from '/assets/mars/mars.jpg';

const Mars = () => {
  const marsRef = useRef<Group>();
  const marsPositionRef = useRef(new Vector3(455, 0, 0));
  const [marsTexture] = useTexture<string[]>([MarsMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

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

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (marsRef.current) {
      marsRef.current.userData = {
        atmosphere: [
          {
            element: 'Carbon Dioxide',
            percentage: 95.3,
          },
          {
            element: 'Nitrogen',
            percentage: 2.7,
          },
          {
            element: 'Other Gases',
            percentage: 2,
          },
        ],
        diameter: 6792,
        gravity: 3.711,
        mass: '6.4171e23',
        moons: 2,
        name: 'Mars',
        orbitalPeriod: 687,
        rotationalPeriod: 1.03,
        sunDistance: '227.9e6',
        surfaceTemp: -63,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (marsRef?.current?.userData) {
      const planetData = marsRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <group ref={marsRef as React.MutableRefObject<Group>}>
      <mesh
        //castShadow
        onClick={handleSelectPlanet}
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
