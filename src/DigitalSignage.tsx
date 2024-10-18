import type React from 'react';
import { useEffect, useState } from 'react';
import image1 from './assets/image1.jpg';
import image2 from './assets/image2.jpg';
import image3 from './assets/image3.jpg';

const images = [image1, image2, image3];
const INTERVAL = 10 * 1000;

const DigitalSignage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      setProgress(0);
    }, INTERVAL);

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) return 0;
        return prevProgress + 1;
      });
    }, INTERVAL / 100);

    return () => {
      clearInterval(imageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <img
        src={images[currentImageIndex]}
        alt='Digital Signage'
        style={{
          width: '100%',
          height: 'calc(100% - 40px)',
          objectFit: 'contain' // または 'contain' に変更
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20px',
          backgroundColor: 'rgba(0, 0, 255, 0.3)'
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'blue',
            transition: 'width 0.1s linear'
          }}
        />
      </div>
    </div>
  );
};

export default DigitalSignage;
