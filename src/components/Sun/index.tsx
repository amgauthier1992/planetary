import React, { useCallback, useEffect, useRef } from 'react';
import { useTexture } from '@react-three/drei'; //useHelper
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three'; //PointLight, PointLightHelper
import { CelestialBody } from '../../context/CelestialBodyProvider';
import { useCelestialBody, useModal } from '../../context/hooks';
import SunMap from '/assets/sun/sun.jpg';

const Sun = () => {
  const sunRef = useRef<Mesh>();
  // const pointLightRef = useRef<PointLight | null>(null);
  const sunTexture = useTexture<string>(SunMap);

  const { handleSelectCelestialBody } = useCelestialBody();
  const { toggleModal } = useModal();

  // useHelper(pointLightRef as React.MutableRefObject<PointLight>, PointLightHelper, 1, 'white');

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y -= 0.002;
    }
  });

  //Assign data directly to mesh after it's creation
  useEffect(() => {
    if (sunRef.current) {
      sunRef.current.userData = {
        atmosphere: [
          {
            element: 'Hydrogen',
            percentage: 92,
          },
          {
            element: 'Helium',
            percentage: 7.8,
          },
          {
            element: 'Other Gases',
            percentage: 0.2,
          },
        ],
        diameter: '1,391,000',
        galaxy: 'Milky Way',
        gravity: 274,
        mass: '1.989e30',
        name: 'Sun',
        relativeSize: '333,000 times larger',
        rotationalPeriod: 25.38,
        starType: 'Yellow Dwarf',
        surfaceTemp: '5,505',
      } as CelestialBody;
    }
  }, []);

  //abstract this into context so that we don't need to repeat it for every planet component?
  const handleSelectSun = useCallback(() => {
    if (sunRef?.current?.userData) {
      const planetData = sunRef.current.userData as CelestialBody;
      handleSelectCelestialBody(planetData);
      toggleModal();
    }
  }, [handleSelectCelestialBody, toggleModal]);

  return (
    <mesh
      onClick={handleSelectSun}
      position={[0, 0, 0]}
      ref={sunRef as React.MutableRefObject<Mesh>}
    >
      {/* Radius , X-axis , Y-axis */}
      <sphereGeometry args={[100, 32, 32]} />
      <meshPhongMaterial
        map={sunTexture}
        emissiveMap={sunTexture}
        emissiveIntensity={0.6}
        emissive={0xffffff}
      />
      <ambientLight />
      {/* <pointLight
        // castShadow
        intensity={100000}
        ref={pointLightRef}
      /> */}
    </mesh>
  );
};

export default Sun;
