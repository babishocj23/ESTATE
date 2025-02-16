import React from 'react';
import OptimizedImage from './OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

const Hero = ({ title, subtitle, children, size = 'large', backgroundImage }) => {
  return (
    <div className="pt-16"> {/* Add padding top to prevent navbar overlap */}
      <div 
        className={`relative w-full ${size === 'large' ? 'h-[600px]' : 'h-[400px]'} bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 overflow-hidden`}
      >
        {/* Background Image */}
        {backgroundImage && (
          <OptimizedImage
            src={backgroundImage}
            alt="background"
            width={imageSizes.hero.width}
            height={imageSizes.hero.height}
            className="absolute inset-0 w-full h-full opacity-50"
            quality={90}
            priority={true}
            loading="eager"
          />
        )}
        
        {/* Background overlay with additional gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900" />
        
        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title.split(' ').map((word, i) => (
              <span key={i} className={i === title.split(' ').length - 1 || i === title.split(' ').length - 2 ? 'text-primary' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>
          {subtitle && (
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hero; 