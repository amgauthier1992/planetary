import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SolarSystem from './layouts/SolarSystem';
// import { Perf } from 'r3f-perf'; //re-enable for performance monitoring

const App = () => {
  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 3, 3] }}
      shadows
    >
      {/* <Perf /> */}
      <OrbitControls />
      <SolarSystem />
    </Canvas>
  );
};

export default App;

