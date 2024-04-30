import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { Group, Points } from 'three';

const AnimatedStars = () => {
  const starsRef = useRef<Points>();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0005;
      starsRef.current.rotation.y += 0.0005;
      starsRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <group ref={starsRef as unknown as React.MutableRefObject<Group>}>
      <Stars radius={800} />
    </group>
  );
};

export default AnimatedStars;
