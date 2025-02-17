import { useState, useEffect, useRef } from 'react';
import { optimizeImage, generateSrcSet, generateBlurPlaceholder, isInViewport } from '../utils/imageOptimizer';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  quality = 75,
  loading = 'lazy',
  placeholder = 'blur',
  sizes = '100vw',
  priority = false,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurredSrc, setBlurredSrc] = useState('');
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imageRef = useRef(null);

  useEffect(() => {
    if (placeholder === 'blur' && src) {
      // Generate a tiny placeholder
      const placeholderSrc = generateBlurPlaceholder(src);
      setBlurredSrc(placeholderSrc);
    }
  }, [src, placeholder]);

  useEffect(() => {
    if (!priority && !shouldLoad) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: '50px'
        }
      );

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority, shouldLoad]);

  // Generate optimized image URL
  const optimizedSrc = optimizeImage(src, { 
    width, 
    height, 
    quality,
    format: 'webp'
  });

  // Generate srcSet for responsive images
  const srcSet = generateSrcSet(src);

  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ aspectRatio: width / height }}
      ref={imageRef}
    >
      {/* Blurred placeholder */}
      {placeholder === 'blur' && blurredSrc && (
        <img
          src={blurredSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 transform transition-opacity duration-300"
          style={{ opacity: isLoaded ? 0 : 1 }}
        />
      )}
      
      {/* Main image */}
      {(shouldLoad || priority) && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : loading}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 