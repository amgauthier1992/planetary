import { useEffect } from 'react';

const PreloadImages = () => {
  useEffect(() => {
    const images = [
      '/assets/misc/stars.jpg',
      '/assets/sun/sun.png',
      '/assets/mercury/mercury.png',
      '/assets/venus/venus.png',
      '/assets/earth/earth.png',
      '/assets/mars/mars.png',
      '/assets/jupiter/jupiter.png',
      '/assets/saturn/saturn.png',
      '/assets/uranus/uranus.png',
      '/assets/neptune/neptune.png',
    ];

    const preload = () => {
      images.forEach((imageUrl: string) => {
        const img = new Image();
        img.src = imageUrl;
      });
    };

    preload();
  }, []);

  return null;
};

export default PreloadImages;
