import { useState } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-dark-900/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/5 transform hover:-translate-y-1 transition-all duration-300 border border-primary/10">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Stay Updated
              <span className="text-primary">.</span>
            </h3>
            <p className="text-gray-400 text-base sm:text-lg">
              Subscribe to our newsletter for exclusive property listings and market insights
            </p>
          </div>
          <div className="relative">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-900/50 backdrop-blur-md border border-primary/10 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400 hover:border-primary/20 transition-colors"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-xl bg-primary hover:bg-primary-600 text-white transition-all duration-300 active:scale-95 touch-manipulation group"
              >
                Subscribe
                <FiArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
            {subscribed && (
              <div className="absolute -bottom-12 left-0 right-0">
                <div className="bg-green-500/10 border border-green-500/20 py-2 px-4 rounded-xl text-green-400 text-center text-sm animate-fade-in">
                  Thank you for subscribing! We'll keep you updated.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter; 