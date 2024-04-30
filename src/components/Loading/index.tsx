import { Html } from '@react-three/drei';

//cartoony Rocket that streams across the screen while Loading from L to R
const Loading = () => {
  return (
    <Html
      as='div'
      fullscreen
    >
      <p>Loading...</p>
    </Html>
  );
};

export default Loading;
