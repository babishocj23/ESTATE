export const optimizeImage = (url, options = {}) => {
  // Default options
  const defaults = {
    width: 800,
    quality: 75,
    auto: 'compress,format',
    fit: 'crop',
    blur: 0,
    format: 'webp'
  };

  // Merge defaults with provided options
  const settings = { ...defaults, ...options };

  // Handle null or undefined URLs
  if (!url) return '';

  // Check if it's already an optimized URL
  if (url.includes('imgix.net') || url.includes('cloudinary.com')) {
    return url;
  }

  // For Unsplash images, use their native optimization
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams({
      q: settings.quality,
      w: settings.width,
      auto: settings.auto,
      fit: settings.fit,
      fm: settings.format
    });

    if (settings.blur > 0) {
      params.append('blur', settings.blur);
    }

    return `${baseUrl}?${params.toString()}`;
  }

  // For uploaded images (assuming they're stored in a local or cloud storage)
  if (url.startsWith('data:')) {
    return url; // Return as-is for base64 images
  }

  // Add a timestamp to force cache refresh when needed
  const timestamp = options.noCache ? `&t=${Date.now()}` : '';
  
  // Return optimized URL with all parameters
  return `${url}?w=${settings.width}&q=${settings.quality}&fm=${settings.format}${timestamp}`;
};

// Predefined sizes with WebP support and quality settings
export const imageSizes = {
  thumbnail: { width: 150, height: 150, quality: 60 },
  card: { width: 400, height: 300, quality: 75 },
  hero: { width: 1920, height: 1080, quality: 80 },
  profile: { width: 300, height: 300, quality: 75 },
  gallery: { width: 800, height: 600, quality: 75 }
};

// Generate srcSet for responsive images
export const generateSrcSet = (url, sizes = [300, 600, 900, 1200]) => {
  return sizes
    .map(size => `${optimizeImage(url, { width: size })} ${size}w`)
    .join(', ');
};

// Generate blur hash placeholder
export const generateBlurPlaceholder = (url) => {
  return optimizeImage(url, {
    width: 20,
    quality: 20,
    blur: 1000
  });
};

// Preload critical images
export const preloadCriticalImages = (images) => {
  images.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizeImage(url, { width: 1200, quality: 60 });
    document.head.appendChild(link);
  });
};

// Helper function to check if an image is in viewport
export const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}; 