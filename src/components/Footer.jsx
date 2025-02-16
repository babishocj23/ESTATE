import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-footer">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">RedLynx Realty</h4>
            <p className="text-gray-400 mb-4">Your trusted partner in finding the perfect property. We make real estate simple and accessible.</p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" className="text-gray-400 hover:text-primary transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-primary transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://facebook.com" className="text-gray-400 hover:text-primary transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-primary transition-colors">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/buy" className="text-gray-400 hover:text-primary transition-colors">Buy Property</Link></li>
              <li><Link to="/rent" className="text-gray-400 hover:text-primary transition-colors">Rent Property</Link></li>
              <li><Link to="/sell" className="text-gray-400 hover:text-primary transition-colors">Sell Property</Link></li>
              <li><Link to="/agents" className="text-gray-400 hover:text-primary transition-colors">Find Agents</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <span>123 Business Avenue, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiPhone className="flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <FiMail className="flex-shrink-0" />
                <span>contact@redlynx.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} RedLynx Realty. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-primary text-sm transition-colors">Terms</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary text-sm transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 