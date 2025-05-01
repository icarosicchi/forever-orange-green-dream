
import React, { useState, useEffect } from 'react';

interface RotatingBackgroundProps {
  images: string[];
  interval?: number;
}

const RotatingBackground: React.FC<RotatingBackgroundProps> = ({ 
  images,
  interval = 5000 // Default interval of 5 seconds
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Only set up the interval if there are multiple images
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {images.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      <div className="absolute inset-0 bg-love-green/10 backdrop-blur-[2px]" />
    </div>
  );
};

export default RotatingBackground;
