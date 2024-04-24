import AnimatedStars from '../components/AnimatedStars';
import Earth from '../components/Planets/Earth';
import Jupiter from '../components/Planets/Jupiter';
import Mars from '../components/Planets/Mars';
import Mercury from '../components/Planets/Mercury';
// import Neptune from '../components/Planets/Neptune';
import Saturn from '../components/Planets/Saturn';
import Sun from '../components/Sun';
import Uranus from '../components/Planets/Uranus';
import Venus from '../components/Planets/Venus';

const SolarSystem = () => {
  return (
    <>
      <color
        attach='background'
        args={['black']}
      />
      <AnimatedStars />
      <Sun />
      <Mercury />
      <Venus />
      <Earth />
      <Mars />
      <Jupiter />
      <Saturn />
      <Uranus />
      {/* <Neptune /> */}
    </>
  );
};

export default SolarSystem;
