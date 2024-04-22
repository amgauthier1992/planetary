import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, DirectionalLight } from 'three';
import AnimatedStars from '../components/AnimatedStars'; // Assuming AnimatedStars is a component in a separate file
import Earth from '../components/Planets/Earth'; // Assuming Earth is a component in a separate file

const SolarSystem = () => {
  const directionalLightRef = useRef<DirectionalLight | null>(null);

  useHelper(
    directionalLightRef as React.MutableRefObject<DirectionalLight>,
    DirectionalLightHelper,
    1,
    'white'
  );

  return (
    <>
      <color
        attach='background'
        args={['black']}
      />
      <AnimatedStars />
      <directionalLight
        intensity={3}
        position={[0, 0, 10]}
        ref={directionalLightRef as React.MutableRefObject<DirectionalLight>}
      />
      {/* Planets */}
      <Earth />
    </>
  );
};

export default SolarSystem;
