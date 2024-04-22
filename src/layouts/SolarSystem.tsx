import AnimatedStars from '../components/AnimatedStars';
import Earth from '../components/Planets/Earth';
import Sun from '../components/Sun';

const SolarSystem = () => {
  return (
    <>
      <color
        attach='background'
        args={['black']}
      />
      <AnimatedStars />
      <Sun />
      <Earth />
    </>
  );
};

export default SolarSystem;
