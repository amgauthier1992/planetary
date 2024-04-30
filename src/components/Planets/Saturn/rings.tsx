import { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { Group, DoubleSide } from 'three';
import SaturnRingsMap from '/assets/saturn/saturn-rings.png';

const SaturnRings = () => {
  const ringsRef = useRef<Group>();
  const [saturnRingsTexture] = useTexture<string[]>([SaturnRingsMap]);

  return (
    <group
      ref={ringsRef as React.MutableRefObject<Group>}
      position={[0, 0, 0]}
      rotation={[Math.PI / -4, 0, 0]}
    >
      {/* Rings position */}
      <mesh>
        <torusGeometry args={[85, 2, 16, 100]} />
        {/* InnerRadius, outerRadius, radialSegments, and tubularSegments */}
        <meshPhongMaterial
          map={saturnRingsTexture}
          side={DoubleSide}
          transparent
        />
      </mesh>
    </group>
  );
};

export default SaturnRings;
