import Hero from '../components/Hero';
import { FiAward, FiHome, FiUsers, FiSmile } from 'react-icons/fi';

const AboutPage = () => {
  const stats = [
    {
      icon: <FiHome className="w-6 h-6" />,
      value: '1000+',
      label: 'Properties Listed',
    },
    {
      icon: <FiUsers className="w-6 h-6" />,
      value: '500+',
      label: 'Happy Clients',
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      value: '10+',
      label: 'Years Experience',
    },
    {
      icon: <FiSmile className="w-6 h-6" />,
      value: '99%',
      label: 'Client Satisfaction',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900">
      <Hero
        title="About RedLynx Realty"
        subtitle="Your trusted partner in real estate excellence"
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-dark-800 p-6 rounded-2xl text-center hover:bg-dark-700 transition-colors duration-300"
            >
              <div className="flex justify-center text-primary mb-4">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <p className="text-gray-400 mb-4">
              RedLynx Realty was founded with a vision to revolutionize the real estate industry by combining traditional values with modern technology. Our journey began over a decade ago, and since then, we've helped countless families find their perfect homes.
            </p>
            <p className="text-gray-400">
              We pride ourselves on our commitment to excellence, transparency, and customer satisfaction. Our team of experienced professionals works tirelessly to ensure that every client receives personalized attention and expert guidance throughout their real estate journey.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-gray-400 mb-4">
              At RedLynx Realty, our mission is to make the process of buying, selling, or renting property as seamless and enjoyable as possible. We believe that everyone deserves to find their perfect property, and we're here to make that dream a reality.
            </p>
            <p className="text-gray-400">
              We're committed to leveraging the latest technology and market insights to provide our clients with the best possible service. Our innovative approach, combined with our deep understanding of the real estate market, sets us apart from the competition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 