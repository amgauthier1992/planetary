import React, { createContext, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Audio as THREEAudio, AudioLoader, AudioListener } from 'three';

export interface AudioContextType {
  audioEnabled: boolean;
  audioLoaded: boolean;
  audioRef: React.MutableRefObject<THREEAudio | null>;
  handleAudioEnabled: () => void;
  handleAudioLoaded: () => void;
}

type AudioProviderProps = {
  children: ReactNode;
};

export const AudioContext = createContext<AudioContextType>({
  audioEnabled: false,
  audioLoaded: false,
  audioRef: { current: null },
  handleAudioEnabled: () => {},
  handleAudioLoaded: () => {},
});

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  const audioRef = useRef<THREEAudio | null>(null);

  const handleAudioEnabled = useCallback(() => {
    setAudioEnabled((prevState) => !prevState);
  }, []);

  const handleAudioLoaded = useCallback(() => {
    setAudioLoaded(true);
  }, []);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audioLoader = new AudioLoader();
        const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
          audioLoader.load('/assets/audio/space.mp3', resolve, undefined, reject);
        });
        const listener = new AudioListener();
        const audio = new THREEAudio(listener);
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.1);
        audioRef.current = audio;
        handleAudioLoaded();
      } catch (error) {
        console.error('Error loading audio:', error);
        handleAudioLoaded(); //still render the app even if audio fails to load
      }
    };

    loadAudio();
  }, [handleAudioLoaded]);

  const contextValue: AudioContextType = {
    audioEnabled,
    audioLoaded,
    audioRef,
    handleAudioEnabled,
    handleAudioLoaded,
  };

  return <AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>;
};
