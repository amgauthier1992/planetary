import { useEffect, useRef } from 'react';
import { Audio as THREEAudio, AudioListener, AudioLoader } from 'three';

const loadAudio = async (audioUrl: string, audioRef: React.MutableRefObject<THREEAudio | null>) => {
  try {
    const audioLoader = new AudioLoader();
    const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
      audioLoader.load(audioUrl, resolve, undefined, reject);
    });
    const listener = new AudioListener();
    const audio = new THREEAudio(listener);
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(0.1);
    audio.play();
    audioRef.current = audio;
  } catch (error) {
    console.error('Error loading audio:', error);
  }
};

const AudioComponent = () => {
  //   const [audioLoaded, setAudioLoaded] = useState<boolean>(false);
  //   const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<THREEAudio | null>(null);

  useEffect(() => {
    const handleUserGesture = () => {
      loadAudio('/assets/audio/space.mp3', audioRef);
      window.removeEventListener('click', handleUserGesture);
    };

    window.addEventListener('click', handleUserGesture);

    return () => {
      window.removeEventListener('click', handleUserGesture);
    };
  }, []);

  return null;
  // <>
  //   {audioError && <p>{audioError}</p>}
  //   {audioLoaded && <p>Audio loaded</p>}
  // </>
};

export default AudioComponent;
