import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group, Vector3, DoubleSide } from 'three';
import SaturnMap from '/assets/saturn/saturn.jpg';
import SaturnRingsMap from '/assets/saturn/saturn-rings.png';

const Saturn = () => {
  const saturnRef = useRef<Group>();
  const planetRef = useRef<Group>();
  const ringsRef = useRef<Group>();
  const saturnPositionRef = useRef(new Vector3(130, 0, 0));

  const [saturnTexture, saturnRingsTexture] = useTexture<string[]>([SaturnMap, SaturnRingsMap]);

  useFrame(({ clock }) => {
    if (saturnRef.current) {
      const angle = clock.getElapsedTime() * 0.6;
      const distance = 130;
      const x = Math.sin(angle) * distance;
      const z = Math.cos(angle) * distance;
      saturnRef.current.position.set(x, 0, z);
      saturnRef.current.rotation.y += 0.02;
      saturnPositionRef.current = saturnRef.current.position;
    }
  });

  return (
    <group ref={saturnRef as React.MutableRefObject<Group>}>
      {/* Planet */}
      <group
        ref={planetRef as React.MutableRefObject<Group>}
        rotation={[Math.PI / 4, 0, 0]}
      >
        {/* Rotate the planet 45 degrees around the x-axis */}
        <mesh receiveShadow>
          <sphereGeometry args={[8, 32, 32]} />
          <meshPhongMaterial map={saturnTexture} />
        </mesh>
      </group>
      {/* Rings */}
      <group
        ref={ringsRef as React.MutableRefObject<Group>}
        position={[0, 0, 0]}
        rotation={[Math.PI / -4, 0, 0]}
      >
        {/* Rings position */}
        <mesh>
          <torusGeometry args={[12, 0.5, 16, 100]} />
          {/* InnerRadius, outerRadius, radialSegments, and tubularSegments */}
          <meshPhongMaterial
            map={saturnRingsTexture}
            side={DoubleSide}
            transparent
          />
        </mesh>
      </group>
    </group>
  );
};

export default Saturn;
