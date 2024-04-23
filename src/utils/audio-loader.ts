import { Audio, AudioListener, AudioLoader } from 'three';

export const loadAudio = async (
  audioUrl: string,
  audioRef: React.MutableRefObject<Audio | null>
) => {
  try {
    const audioLoader = new AudioLoader();
    const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
      audioLoader.load(audioUrl, resolve, undefined, reject);
    });
    const listener = new AudioListener();
    const audio = new Audio(listener);
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(0.1);
    audio.play();
    audioRef.current = audio;
  } catch (error) {
    console.error('Error loading audio:', error);
  }
};
