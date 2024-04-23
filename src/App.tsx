import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Audio from './components/Audio';
import Loading from './components/Loading';
import SolarSystem from './layouts/SolarSystem';
import { Perf } from 'r3f-perf'; //enable for performance monitoring

const App = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 75, 125] }}
      shadows
    >
      <Suspense fallback={<Loading />}>
        <Perf />
        <OrbitControls
          enableDamping
          dampingFactor={0.25}
          rotateSpeed={0.5}
          zoomSpeed={3}
          panSpeed={2}
          autoRotate={false}
          enableZoom
          enablePan
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
        <SolarSystem />
        <Audio />
      </Suspense>
    </Canvas>
  );
};

export default App;
