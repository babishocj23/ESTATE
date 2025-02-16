import { useState, useEffect } from 'react';
import { optimizeImage } from '../utils/imageOptimizer';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  quality = 75,
  loading = 'lazy',
  placeholder = 'blur',
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurredSrc, setBlurredSrc] = useState('');

  useEffect(() => {
    if (placeholder === 'blur' && src) {
      // Generate a tiny placeholder
      const tinyPlaceholder = optimizeImage(src, {
        width: 20,
        quality: 20,
        blur: 1000
      });
      setBlurredSrc(tinyPlaceholder);
    }
  }, [src, placeholder]);

  // Optimize the main image
  const optimizedSrc = optimizeImage(src, { width, height, quality });

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width / height }}>
      {/* Blurred placeholder */}
      {placeholder === 'blur' && blurredSrc && (
        <img
          src={blurredSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 transform transition-opacity duration-300"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      
      {/* Main image */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage; 