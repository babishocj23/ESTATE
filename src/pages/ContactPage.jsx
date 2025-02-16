import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiMessageSquare, FiUser } from 'react-icons/fi';
import Hero from '../components/Hero';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically handle the form submission
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-dark-900">
      <Hero
        title="Contact Us"
        subtitle="Get in touch with our team of real estate experts"
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3"
      />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-400 mb-8">
              Have questions about our properties or services? Our team is here to help you find the perfect solution for your real estate needs.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-dark-800 p-3 rounded-xl">
                  <FiMapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Office Location</h3>
                  <p className="text-gray-400">123 Business Avenue, Silicon Valley, CA 94025</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-dark-800 p-3 rounded-xl">
                  <FiPhone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Phone Number</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-dark-800 p-3 rounded-xl">
                  <FiMail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Address</h3>
                  <p className="text-gray-400">contact@redlynx.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-dark-800/50 backdrop-blur-md p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                    placeholder="Your email"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                    placeholder="Your phone (optional)"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-4 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full pl-12 pr-4 py-3 bg-dark-700 rounded-xl focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                    placeholder="Your message"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-xl transition-transform duration-300 hover:scale-105"
              >
                Send Message
              </button>
            </form>

            {submitted && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                <p className="text-green-400 text-center">
                  Thank you for your message! We'll get back to you soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 