import { useState } from 'react';
import { FiSearch, FiPhone, FiHeart, FiBriefcase, FiStar, FiMapPin, FiSend } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';

// Static data for agents
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
    specialties: ["Luxury Homes", "Waterfront Properties"]
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
    specialties: ["Residential", "Commercial"]
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
    specialties: ["First-time Buyers", "Investment Properties"]
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
    specialties: ["Commercial", "Office Space"]
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
    specialties: ["Luxury Homes", "Residential"]
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
    specialties: ["Investment Properties", "Commercial"]
  }
];

const FindAgentsPage = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    experience: ''
  });
  const [favoriteAgents, setFavoriteAgents] = useState(new Set());
  const [showPhone, setShowPhone] = useState(new Set());

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredAgents = staticAgents.filter(agent => {
    if (filters.location && !agent.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.specialty && !agent.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()))) return false;
    if (filters.experience) {
      const years = parseInt(agent.experience);
      if (filters.experience === '0-5' && years > 5) return false;
      if (filters.experience === '5-10' && (years < 5 || years > 10)) return false;
      if (filters.experience === '10+' && years < 10) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="relative">
        {/* Hero Section with Parallax Effect */}
        <div className="relative">
          <div 
            className="relative h-[400px] sm:h-[600px] bg-cover bg-center" 
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-900/50 to-dark-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80"></div>
            <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[2px]"></div>
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-32">
              <div className="max-w-4xl mx-auto text-center w-full">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4">
                  Meet Our <span className="text-primary">Agents</span>
                </h1>
                <p className="text-base sm:text-xl text-gray-300 mb-4">
                  Find the perfect agent for your property needs
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-7xl mx-auto -mt-20 px-4 relative z-10">
            <div className="bg-dark-900/40 backdrop-blur-md p-4 sm:p-6 rounded-3xl shadow-xl border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search location..."
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700"
                    value={filters.location}
                    onChange={handleFilterChange}
                    name="location"
                  />
                </div>

                {/* Specialty Filter */}
                <div className="relative">
                  <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700 appearance-none"
                    value={filters.specialty}
                    onChange={handleFilterChange}
                    name="specialty"
                  >
                    <option value="">Specialty</option>
                    <option value="Luxury Homes">Luxury Homes</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Investment">Investment Properties</option>
                  </select>
                </div>

                {/* Experience Filter */}
                <div className="relative">
                  <FiStar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-dark-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700 appearance-none"
                    value={filters.experience}
                    onChange={handleFilterChange}
                    name="experience"
                  >
                    <option value="">Experience</option>
                    <option value="0-5">0-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                {/* Search Button */}
                <button className="h-12 px-6 bg-primary hover:bg-primary-600 text-white rounded-xl transition-all duration-300 text-sm font-medium">
                  Find Agent
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              Our Agents<span className="text-primary">.</span>
            </h2>
            <button 
              onClick={() => navigate('/all-agents')}
              className="text-primary hover:text-primary-dark transition-colors text-sm sm:text-base"
            >
              View All →
            </button>
          </div>

          {/* Mobile-Optimized Agent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent._id}
                className="bg-dark-900/40 backdrop-blur-md border border-primary/10 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
              >
                {/* Agent Image Section */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={agent.profileImage}
                    alt={agent.fullName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent"></div>
                  
                  {/* Experience Badge */}
                  <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
                    {agent.experience}
                  </div>
                  
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(agent._id)}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md ${
                      favoriteAgents.has(agent._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-dark-900/60 text-gray-400 hover:bg-dark-900/80'
                    } hover:scale-110 transition-all duration-300`}
                  >
                    <FiHeart className="w-4 h-4" />
                  </button>

                  {/* Agent Name and Title - Overlaid on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{agent.fullName}</h3>
                    <p className="text-primary-400 text-sm">{agent.title}</p>
                  </div>
                </div>

                {/* Agent Details */}
                <div className="p-4">
                  {/* Location and Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <FiMapPin className="text-primary-400 w-4 h-4" />
                      <span>{agent.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <FiStar className="w-4 h-4" />
                      <span className="font-bold text-sm">{agent.rating}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-primary/10 text-primary-400 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => togglePhone(agent._id)}
                      className="flex-1 flex items-center justify-center gap-2 h-10 bg-dark-800/40 backdrop-blur-md border border-primary/20 text-white rounded-xl transition-all duration-300 hover:bg-primary/10 text-sm"
                    >
                      <FiPhone className="w-4 h-4" />
                      {showPhone.has(agent._id) ? agent.phone : 'Call'}
                    </button>
                    <button
                      onClick={() => window.open(`https://t.me/${agent.telegram}`, '_blank', 'noopener noreferrer')}
                      className="flex-1 flex items-center justify-center gap-2 h-10 bg-dark-800/40 backdrop-blur-md border border-primary/20 text-white rounded-xl transition-all duration-300 hover:bg-primary/10 text-sm"
                    >
                      <FiSend className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </div>
  );
};

export default FindAgentsPage; 