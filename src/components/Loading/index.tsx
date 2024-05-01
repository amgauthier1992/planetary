import { Html } from '@react-three/drei';
import RocketIcon from './icon';
import './styles.css';

const Loading = () => {
  return (
    <Html
      fullscreen
      style={{
        position: 'relative',
        backgroundColor: '#212526',
      }}
    >
      <div className='rocket-container'>
        <div className='structure'>
          <RocketIcon />
        </div>
      </div>
      <div className='text-container'>
        <h2 className='loader-text'>Loading...</h2>
      </div>
      <div className='smoke'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Html>
  );
};

export default Loading;
