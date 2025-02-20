import { useState } from 'react';
import { FiSearch, FiPhone, FiHeart, FiBriefcase, FiStar, FiMapPin, FiSend, FiFilter, FiMail, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
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
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [filters, setFilters] = useState({
    location: '',
    specialty: '',
    experience: '',
    area: ''
  });
  const [favoriteAgents, setFavoriteAgents] = useState(new Set());
  const [showPhone, setShowPhone] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

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
    const searchTerm = filters.location.toLowerCase();
    const matchesSearch = 
      agent.location.toLowerCase().includes(searchTerm) ||
      agent.fullName.toLowerCase().includes(searchTerm) ||
      agent.phone.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''));
    
    if (filters.location && !matchesSearch) return false;
    if (filters.specialty && !agent.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()))) return false;
    if (filters.experience) {
      const years = parseInt(agent.experience);
      if (filters.experience === '0-5' && years > 5) return false;
      if (filters.experience === '5-10' && (years < 5 || years > 10)) return false;
      if (filters.experience === '10+' && years < 10) return false;
    }
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  // Desktop version
  const DesktopVersion = () => (
    <>
      {/* Hero Section */}
      <div className="relative h-[600px] bg-cover bg-center" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format")'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-dark-900/70 to-dark-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80"></div>
        <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[2px]"></div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-48">
          <div className="max-w-4xl mx-auto text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Meet Our <span className="text-primary">Agents</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Find the perfect agent for your property needs
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto -mt-32 px-4 relative z-10">
        <div className="bg-dark-900/40 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-primary/10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-dark-800 rounded-xl border border-gray-700 focus:outline-none focus:border-primary"
              />
            </div>
            <select
              value={filters.specialty}
              onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
              className="w-full px-4 py-3 bg-dark-800 rounded-xl border border-gray-700 focus:outline-none focus:border-primary"
            >
              <option value="">All Specialties</option>
              <option value="Luxury Homes">Luxury Homes</option>
              <option value="Commercial">Commercial</option>
              <option value="Residential">Residential</option>
              <option value="Investment">Investment</option>
            </select>
            <select
              value={filters.area}
              onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
              className="w-full px-4 py-3 bg-dark-800 rounded-xl border border-gray-700 focus:outline-none focus:border-primary"
            >
              <option value="">All Locations</option>
              <option value="Beverly Hills">Beverly Hills</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Santa Monica">Santa Monica</option>
              <option value="Malibu">Malibu</option>
              <option value="Downtown LA">Downtown LA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Agents Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Featured Agents<span className="text-primary">.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staticAgents.slice(0, 3).map((agent) => (
            <div
              key={agent._id}
              className="bg-dark-900/40 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-primary/10"
            >
              <div className="aspect-square relative">
                <img
                  src={agent.profileImage}
                  alt={agent.fullName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900/90 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">{agent.fullName}</h3>
                  <p className="text-primary-400">{agent.title}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(agent._id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md ${
                    favoriteAgents.has(agent._id)
                      ? 'bg-red-500/90 text-white'
                      : 'bg-dark-900/50 text-gray-400'
                  } hover:scale-110 transition-all duration-300`}
                >
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-dark-900/40 backdrop-blur-md border-t border-primary/5">
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <FiMapPin className="w-4 h-4" />
                  <span>{agent.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="w-4 h-4" />
                    {agent.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500" />
                    {agent.rating}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => togglePhone(agent._id)}
                    className="flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors"
                  >
                    <FiPhone className="w-4 h-4" />
                    {showPhone.has(agent._id) ? agent.phone : 'Call'}
                  </button>
                  <button
                    onClick={() => window.open(`https://t.me/${agent.telegram}`, '_blank')}
                    className="flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors"
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

      {/* All Agents Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            All Agents<span className="text-primary">.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map((agent) => (
            <div
              key={agent._id}
              className="bg-dark-900/40 backdrop-blur-md rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 border border-primary/10"
            >
              <div className="aspect-square relative">
                <img
                  src={agent.profileImage}
                  alt={agent.fullName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900/90 to-transparent p-6">
                  <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(255,255,255,0.3)]">{agent.fullName}</h3>
                  <p className="text-primary-400">{agent.title}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(agent._id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md ${
                    favoriteAgents.has(agent._id)
                      ? 'bg-red-500/90 text-white'
                      : 'bg-dark-900/50 text-gray-400'
                  } hover:scale-110 transition-all duration-300`}
                >
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-dark-900/40 backdrop-blur-md border-t border-primary/5">
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <FiMapPin className="w-4 h-4" />
                  <span>{agent.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agent.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <FiBriefcase className="w-4 h-4" />
                    {agent.experience}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiStar className="w-4 h-4 text-yellow-500" />
                    {agent.rating}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => togglePhone(agent._id)}
                    className="flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors"
                  >
                    <FiPhone className="w-4 h-4" />
                    {showPhone.has(agent._id) ? agent.phone : 'Call'}
                  </button>
                  <button
                    onClick={() => window.open(`https://t.me/${agent.telegram}`, '_blank')}
                    className="flex items-center justify-center gap-2 py-2 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 transition-colors"
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

      <Newsletter />
    </>
  );

  // Mobile version
  const MobileVersion = () => (
    <>
      <div className="relative">
        {/* Hero Section */}
        <div className="relative">
          <div 
            className="relative h-[300px] bg-cover bg-center" 
            style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&q=85&w=1920&h=1080&fit=crop&auto=format")'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900/95 via-dark-900/50 to-dark-900"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80"></div>
            <div className="absolute inset-0 bg-dark-900/10 backdrop-blur-[2px]"></div>
            <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-24">
              <div className="max-w-4xl mx-auto text-center w-full">
                <h1 className="text-2xl font-bold text-white mb-2">
                  Meet Our <span className="text-primary">Agents</span>
                </h1>
                <p className="text-sm text-gray-300">
                  Find the perfect agent for your property needs
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Search Section */}
          <div className="max-w-7xl mx-auto -mt-16 px-4 relative z-10">
            <div className="bg-dark-900/40 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-primary/10">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, location..."
                    className="w-full h-11 pl-10 pr-4 rounded-2xl bg-dark-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-700"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`w-11 h-11 rounded-2xl border-2 transition-all duration-300 flex items-center justify-center ${
                    showFilters ? 'border-primary bg-primary/10 text-white' : 'border-gray-700 text-gray-400'
                  }`}
                >
                  <FiFilter className="w-4 h-4" />
                </button>
              </div>

              {showFilters && (
                <div className="mt-2 bg-dark-800/50 backdrop-blur-sm rounded-xl p-3 grid grid-cols-2 gap-2">
                  <select
                    className="h-9 px-2 rounded-lg bg-dark-800 text-white text-xs border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={filters.specialty}
                    onChange={(e) => setFilters(prev => ({ ...prev, specialty: e.target.value }))}
                  >
                    <option value="">All Specialties</option>
                    <option value="Luxury Homes">Luxury Homes</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Investment">Investment</option>
                  </select>

                  <select
                    className="h-9 px-2 rounded-lg bg-dark-800 text-white text-xs border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={filters.area}
                    onChange={(e) => setFilters(prev => ({ ...prev, area: e.target.value }))}
                  >
                    <option value="">All Locations</option>
                    <option value="Beverly Hills">Beverly Hills</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Santa Monica">Santa Monica</option>
                    <option value="Malibu">Malibu</option>
                    <option value="Downtown LA">Downtown LA</option>
                  </select>
                </div>
              )}
          </div>
        </div>

          {/* Mobile Agents Grid */}
          <div className="mt-6 px-4">
            <div className="grid grid-cols-1 gap-4">
            {filteredAgents.map((agent) => (
              <div
                key={agent._id}
                  className="bg-dark-900/40 backdrop-blur-md border border-primary/5 rounded-2xl overflow-hidden"
              >
                  <div className="p-4 flex items-start gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0">
                  <img
                    src={agent.profileImage}
                    alt={agent.fullName}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-md">
                        {agent.rating}★
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold truncate">{agent.fullName}</h3>
                      <p className="text-primary-400 text-sm mb-1">{agent.title}</p>
                      <p className="text-gray-400 text-sm flex items-center gap-1">
                        <FiMapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{agent.location}</span>
                      </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(agent._id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      favoriteAgents.has(agent._id)
                        ? 'bg-red-500 text-white'
                          : 'bg-dark-800 text-gray-400'
                      }`}
                  >
                      <FiHeart className="w-4 h-4" />
                  </button>
                  </div>
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-1">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                          className="text-xs bg-primary/10 text-primary-400 px-2 py-0.5 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-700/50 border-t border-gray-700/50">
                    <button
                      onClick={() => togglePhone(agent._id)}
                      className="flex items-center justify-center gap-2 py-3 text-sm text-white hover:bg-dark-800/40"
                    >
                      <FiPhone className="w-4 h-4" />
                      {showPhone.has(agent._id) ? agent.phone : 'Call'}
                    </button>
                    <button
                      onClick={() => window.open(`https://t.me/${agent.telegram}`, '_blank')}
                      className="flex items-center justify-center gap-2 py-3 text-sm text-white hover:bg-dark-800/40"
                    >
                      <FiSend className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              ))}
              </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-dark-900">
      {isMobile ? <MobileVersion /> : <DesktopVersion />}
    </div>
  );
};

export default FindAgentsPage; 