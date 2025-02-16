import { useState } from 'react';
import { FiPhone, FiHeart, FiBriefcase, FiStar, FiMapPin, FiSend } from 'react-icons/fi';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';

// Import the same agents data
const staticAgents = [
  {
    _id: 1,
    fullName: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    email: "sarah.j@redlynx.com",
    phone: "+1 (555) 123-4567",
    telegram: "sarahj_realty",
    location: "Beverly Hills",
    experience: "8 years",
    rating: "4.9",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3",
    specialties: ["Luxury Homes", "Waterfront Properties"],
    bio: "With 8 years of experience in luxury real estate, Sarah specializes in high-end properties and waterfront homes. Her attention to detail and personalized service ensure a seamless experience for her clients."
  },
  {
    _id: 2,
    fullName: "Michael Rodriguez",
    title: "Luxury Property Specialist",
    email: "michael.r@redlynx.com",
    phone: "+1 (555) 234-5678",
    telegram: "michael_luxury",
    location: "Los Angeles",
    experience: "12 years",
    rating: "4.8",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3",
    specialties: ["Residential", "Commercial"],
    bio: "Michael brings 12 years of expertise in both residential and commercial properties. His deep understanding of the Los Angeles market makes him an invaluable asset to his clients."
  },
  {
    _id: 3,
    fullName: "Emily Chen",
    title: "Real Estate Consultant",
    email: "emily.c@redlynx.com",
    phone: "+1 (555) 345-6789",
    telegram: "emilychen_re",
    location: "Santa Monica",
    experience: "6 years",
    rating: "4.7",
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3",
    specialties: ["First-time Buyers", "Investment Properties"],
    bio: "Emily specializes in helping first-time buyers navigate the real estate market. She also has extensive experience in investment properties and market analysis."
  },
  {
    _id: 4,
    fullName: "David Thompson",
    title: "Commercial Property Expert",
    email: "david.t@redlynx.com",
    phone: "+1 (555) 456-7890",
    telegram: "davidthompson_re",
    location: "Beverly Hills",
    experience: "15 years",
    rating: "5.0",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
    specialties: ["Commercial", "Office Space"],
    bio: "David is our leading commercial property expert with 15 years in the industry. His expertise in office space and commercial developments is unmatched."
  },
  {
    _id: 5,
    fullName: "Jessica Martinez",
    title: "Residential Property Specialist",
    email: "jessica.m@redlynx.com",
    phone: "+1 (555) 567-8901",
    telegram: "jessica_realty",
    location: "Malibu",
    experience: "10 years",
    rating: "4.9",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3",
    specialties: ["Luxury Homes", "Residential"],
    bio: "Jessica specializes in luxury residential properties in Malibu. Her decade of experience and local market knowledge help clients find their perfect home."
  },
  {
    _id: 6,
    fullName: "Robert Wilson",
    title: "Investment Property Advisor",
    email: "robert.w@redlynx.com",
    phone: "+1 (555) 678-9012",
    telegram: "robertw_invest",
    location: "Downtown LA",
    experience: "9 years",
    rating: "4.8",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3",
    specialties: ["Investment Properties", "Commercial"],
    bio: "Robert's expertise lies in investment properties and commercial real estate. He helps investors make informed decisions and maximize their returns."
  }
];

const AllAgentsPage = () => {
  const [favoriteAgents, setFavoriteAgents] = useState(new Set());
  const [showPhone, setShowPhone] = useState(new Set());
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const toggleFavorite = (agentId) => {
    setFavoriteAgents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  const togglePhone = (agentId) => {
    setShowPhone(prev => {
      const newSet = new Set(prev);
      if (newSet.has(agentId)) {
        newSet.delete(agentId);
      } else {
        newSet.add(agentId);
      }
      return newSet;
    });
  };

  const filteredAgents = staticAgents.filter(agent => {
    if (selectedLocation && agent.location !== selectedLocation) return false;
    if (selectedSpecialty && !agent.specialties.includes(selectedSpecialty)) return false;
    return true;
  });

  const locations = [...new Set(staticAgents.map(agent => agent.location))];
  const specialties = [...new Set(staticAgents.flatMap(agent => agent.specialties))];

  return (
    <div className="min-h-screen bg-dark-900">
      <Hero 
        title="Our Real Estate Agents"
        subtitle="Meet our team of experienced real estate professionals"
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3"
        size="small"
      />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            className="px-4 py-2 bg-dark-800 rounded-xl text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
          <select
            className="px-4 py-2 bg-dark-800 rounded-xl text-white border border-gray-700 focus:ring-2 focus:ring-primary"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAgents.map((agent) => (
            <div
              key={agent._id}
              className="bg-dark-800 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3">
                  <img
                    src={agent.profileImage}
                    alt={agent.fullName}
                    className="w-full h-full object-cover min-h-[300px]"
                  />
                  <div className="absolute top-4 left-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm">
                    {agent.experience}
                  </div>
                  <button
                    onClick={() => toggleFavorite(agent._id)}
                    className={`absolute top-4 right-4 p-2 rounded-full ${
                      favoriteAgents.has(agent._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-dark-900/80 text-gray-400'
                    } hover:scale-110 transition-all duration-300`}
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{agent.fullName}</h3>
                      <p className="text-gray-400">{agent.title}</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <FiStar className="w-5 h-5" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <FiMapPin />
                    <span>{agent.location}</span>
                  </div>
                  <p className="text-gray-400 mb-4">{agent.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary-500/10 text-primary-400 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => togglePhone(agent._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    >
                      <FiPhone />
                      {showPhone.has(agent._id) ? agent.phone : 'Call'}
                    </button>
                    <button
                      onClick={() => window.open(`https://t.me/${agent.telegram}`, '_blank', 'noopener noreferrer')}
                      className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.3)]"
                    >
                      <FiSend />
                      Telegram
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default AllAgentsPage; 