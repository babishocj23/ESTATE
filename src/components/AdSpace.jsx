import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

const AdSpace = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Sample ads data - in production this would come from your backend
  const ads = [
    {
      id: 1,
      title: "Luxury Penthouse",
      image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?ixlib=rb-4.0.3&q=85&w=800&h=600&fit=crop&auto=format",
      link: "#"
    },
    {
      id: 2,
      title: "Beachfront Villa",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&w=800&h=600&fit=crop&auto=format",
      link: "#"
    },
    {
      id: 3,
      title: "Modern Apartment",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&q=85&w=800&h=600&fit=crop&auto=format",
      link: "#"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 bg-dark-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
      <div className="relative">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 z-10 p-1 bg-dark-900/80 rounded-full text-white hover:bg-dark-700 transition-colors duration-300"
        >
          <FiX className="w-4 h-4" />
        </button>
        
        <div className="relative h-40 overflow-hidden">
          {ads.map((ad, index) => (
            <div
              key={ad.id}
              className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentAdIndex ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                transform: `translateX(${(index - currentAdIndex) * 100}%)`,
              }}
            >
              <OptimizedImage
                src={ad.image}
                alt={ad.title}
                width={imageSizes.gallery.width}
                height={imageSizes.gallery.height}
                className="w-full h-full object-cover"
                quality={85}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark-900/90 to-transparent">
                <h3 className="text-white font-semibold text-sm">{ad.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center gap-1 p-2 bg-dark-900/90">
          {ads.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentAdIndex ? 'bg-primary' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentAdIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdSpace; 