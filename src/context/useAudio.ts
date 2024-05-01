import { useContext } from 'react';
import { AudioContext, AudioContextType } from './AudioProvider';

export const useAudio = () => useContext<AudioContextType>(AudioContext);
