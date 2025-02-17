import React from 'react';
import OptimizedImage from './OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

const Hero = ({ title, subtitle, children, size = 'large', backgroundImage }) => {
  return (
    <div className="relative pt-16"> {/* Add padding top to prevent navbar overlap */}
      <div 
        className={`relative w-full ${size === 'large' ? 'h-[600px]' : 'h-[400px]'} flex items-center`}
      >
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-0">
          {backgroundImage && (
            <OptimizedImage
              src={backgroundImage}
              alt="background"
              width={imageSizes.hero.width}
              height={imageSizes.hero.height}
              className="w-full h-full object-cover"
              quality={90}
              priority={true}
              loading="eager"
            />
          )}
          {/* Multiple gradient overlays for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-dark-900/90 via-dark-900/50 to-dark-900/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/75 via-transparent to-dark-900/75" />
          <div className="absolute inset-0 bg-dark-900/20" />
        </div>
        
        {/* Content */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {title.split(' ').map((word, i) => (
                <span key={i} className={i === title.split(' ').length - 1 ? 'text-primary' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-lg">
                {subtitle}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 