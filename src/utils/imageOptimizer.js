export const optimizeImage = (url, options = {}) => {
  // Default options
  const defaults = {
    width: 800,
    quality: 75,
    auto: 'compress,format',
    fit: 'crop'
  };

  // Merge defaults with provided options
  const settings = { ...defaults, ...options };

  // Check if it's already an Imgix URL
  if (url.includes('imgix.net')) {
    return url;
  }

  // For Unsplash images, use their native optimization
  if (url.includes('unsplash.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?q=${settings.quality}&w=${settings.width}&auto=${settings.auto}&fit=${settings.fit}`;
  }

  // For other images, you could use a service like Imgix, Cloudinary, etc.
  // Example with Imgix (you would need to set up an account and replace with your domain)
  // return `https://your-imgix-domain.imgix.net/${encodeURIComponent(url)}?w=${settings.width}&q=${settings.quality}&auto=${settings.auto}&fit=${settings.fit}`;
  
  return url;
};

// Predefined sizes for different use cases
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  card: { width: 400, height: 300 },
  hero: { width: 1920, height: 1080 },
  profile: { width: 300, height: 300 },
  gallery: { width: 800, height: 600 }
}; 