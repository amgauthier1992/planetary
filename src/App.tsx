import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import AudioControl from './components/AudioControl';
import SolarSystem from './layouts/SolarSystem';
import Loading from './components/Loading';
import { useAudio } from './context/useAudio';
// import { Perf } from 'r3f-perf';

const App = () => {
  const { audioLoaded } = useAudio();

  return (
    <Canvas
      camera={{ fov: 75, near: 0.1, far: 4500, position: [0, 400, 500] }}
      shadows
    >
      {audioLoaded ? (
        <>
          {/* <Perf /> */}
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
          <AudioControl />
        </>
      ) : (
        <Loading />
      )}
    </Canvas>
  );
};

export default App;
