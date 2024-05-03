import { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { CelestialBody } from '../../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../../context/hooks';
import MercuryMap from '/assets/mercury/mercury.jpg';

const Mercury = () => {
  const mercuryRef = useRef<Mesh>();
  const mercuryPositionRef = useRef(new Vector3(175, 0, 0));
  const [mercuryTexture] = useTexture<string[]>([MercuryMap]);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

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

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (mercuryRef.current) {
      mercuryRef.current.userData = {
        diameter: '4,879',
        gravity: 3.7,
        mass: '3.3011e23',
        moons: 0,
        name: 'Mercury',
        orbitalPeriod: 88,
        rotationalPeriod: 58.6,
        sunDistance: '57.9e6',
        surfaceTemp: 167,
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectPlanet = useCallback(() => {
    if (mercuryRef?.current?.userData) {
      const planetData = mercuryRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <mesh
      //castShadow
      onClick={handleSelectPlanet}
      receiveShadow
      ref={mercuryRef as React.MutableRefObject<Mesh>}
    >
      <sphereGeometry args={[12, 32, 32]} />
      <meshPhongMaterial map={mercuryTexture} />
    </mesh>
  );
};

export default Mercury;
