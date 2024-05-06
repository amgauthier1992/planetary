import { useEffect, useState } from 'react';
import { useCelestialBody, useModal } from '../../context/hooks';
import './styles.css';

const FactsModal = () => {
  const { isModalOpen, toggleModal } = useModal();
  const { selectedBody } = useCelestialBody();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imageUrls = [
      '/assets/misc/stars.jpg',
      '/assets/sun/sun-min.png',
      '/assets/mercury/mercury-min.png',
      '/assets/venus/venus-min.png',
      '/assets/earth/earth-min.png',
      '/assets/mars/mars-min.png',
      '/assets/jupiter/jupiter-min.png',
      '/assets/saturn/saturn-min.png',
      '/assets/uranus/uranus-min.png',
      '/assets/neptune/neptune-min.png',
    ];
    preloadImages(imageUrls);
  }, []);

  const preloadImages = (urls: string[]) => {
    const imagePromises = urls.map((url) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
      });
  };

  return isModalOpen && selectedBody && imagesLoaded ? (
    <div className='modal-overlay'>
      <div className='modal'>
        <button
          onClick={toggleModal}
          className='close-button'
        >
          Close
        </button>
        <div className='modal-content'>
          <h2>{selectedBody.name}</h2>
          <img
            alt={selectedBody.name}
            className='modal-img'
            src={`/assets/${selectedBody.name.toLowerCase()}/${selectedBody.name.toLowerCase()}-min.png`}
          />
          <div className='facts'>
            <div className='fact-row'>
              <p className='fact-l'>
                <span className='fact-title'>Diameter:</span> {selectedBody.diameter} km
              </p>
              <p className='fact-r'>
                <span className='fact-title'>Gravity:</span> {selectedBody.gravity} m/s²
              </p>
            </div>
            <div className='fact-row'>
              <p className='fact-l'>
                <span className='fact-title'>Mass:</span> {selectedBody.mass} kg
              </p>
              <p className='fact-r'>
                <span className='fact-title'>Surface Temp:</span> {selectedBody.surfaceTemp}&deg;C
              </p>
            </div>
            <div className='fact-row'>
              {selectedBody.orbitalPeriod && (
                <p className='fact-l'>
                  <span className='fact-title'>Orbital Period:</span> {selectedBody.orbitalPeriod}{' '}
                  days
                </p>
              )}
              {selectedBody.relativeSize && (
                <p className='fact-l'>
                  <span className='fact-title'>Size relative to Earth:</span>{' '}
                  {selectedBody.relativeSize} (mass)
                </p>
              )}
              <p className='fact-r'>
                <span className='fact-title'>Rotational Period:</span>{' '}
                {selectedBody.rotationalPeriod} days
              </p>
            </div>
            <div className='fact-row'>
              {selectedBody.starType && (
                <p className='fact-l'>
                  <span className='fact-title'>Star Type:</span> {selectedBody.starType}
                </p>
              )}
              {selectedBody.sunDistance && (
                <p className='fact-l'>
                  <span className='fact-title'>Distance From Sun:</span> {selectedBody.sunDistance}{' '}
                  km
                </p>
              )}
              {selectedBody.galaxy && (
                <p className='fact-r'>
                  <span className='fact-title'>Galaxy:</span> {selectedBody.galaxy}
                </p>
              )}
              {selectedBody.moons && (
                <p className='fact-r'>
                  <span className='fact-title'>Moons:</span> {selectedBody.moons}
                </p>
              )}
            </div>
            <div className='fact-row'>
              <div className='fact-l'>
                <span className='fact-title'>Atmosphere:</span>
                <ul className='atmospheric-elements'>
                  {selectedBody.atmosphere?.map((element) => (
                    <li
                      className='atmospheric-element'
                      key={element.element}
                    >
                      <span className='element-title'>{element.element}:</span> {element.percentage}
                      %
                    </li>
                  ))}
                  {!selectedBody.atmosphere && <li>None</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default FactsModal;
