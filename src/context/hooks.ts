import { useContext } from 'react';
import { AudioContext, AudioContextType } from './AudioProvider';
import { CelestialBodyContext, CelestialBodyContextType } from './CelestialBodyProvider';
import { ModalContext, ModalContextType } from './ModalProvider';

export const useAudio = () => useContext<AudioContextType>(AudioContext);
export const useCelestialBody = () => useContext<CelestialBodyContextType>(CelestialBodyContext);
export const useModal = () => useContext<ModalContextType>(ModalContext);
