import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import OptimizedImage from './OptimizedImage';
import { imageSizes } from '../utils/imageOptimizer';

const AuthLayout = ({ children, title, subtitle, backgroundImage }) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <OptimizedImage
          src={backgroundImage}
          alt="background"
          width={imageSizes.hero.width}
          height={imageSizes.hero.height}
          className="w-full h-full object-cover"
          quality={85}
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900/95 via-dark-900/90 to-primary/5 backdrop-blur-sm"></div>
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/"
        className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 z-10 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Home</span>
      </Link>

      {/* Auth Form Container */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        {/* Form Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 