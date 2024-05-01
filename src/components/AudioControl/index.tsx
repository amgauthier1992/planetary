import { useContext } from 'react';
import { Html } from '@react-three/drei';
import { AudioContext, AudioContextType } from '../../context/AudioProvider';
import MutedIcon from './muted';
import UnMutedIcon from './unmuted';
import './styles.css';

const AudioControl = () => {
  const { audioEnabled, audioLoaded, audioRef, handleAudioEnabled } =
    useContext<AudioContextType>(AudioContext);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioRef.current.isPlaying) {
        audioRef.current.pause();
        handleAudioEnabled();
      } else {
        audioRef.current.play();
        handleAudioEnabled();
      }
    }
  };

  return audioLoaded ? (
    <Html wrapperClass='audio-control-container'>
      <button
        className='audio-toggle'
        onClick={toggleAudio}
      >
        {audioEnabled ? <UnMutedIcon /> : <MutedIcon />}
      </button>
    </Html>
  ) : null;
};

export default AudioControl;
