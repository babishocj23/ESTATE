import { useState } from 'react';
import { FiSearch, FiMapPin, FiPhone, FiMail, FiAward, FiHome } from 'react-icons/fi';

const agents = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Senior Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3',
    location: 'Miami, FL',
    specialties: ['Luxury Homes', 'Waterfront Properties', 'Condos'],
    experience: 8,
    properties: 150,
    rating: 4.9,
    email: 'sarah.j@redlynx.com',
    phone: '+1 (555) 123-4567',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    title: 'Real Estate Consultant',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3',
    location: 'Miami Beach, FL',
    specialties: ['Residential', 'Investment Properties', 'New Construction'],
    experience: 5,
    properties: 98,
    rating: 4.8,
    email: 'michael.r@redlynx.com',
    phone: '+1 (555) 234-5678',
  },
  {
    id: 3,
    name: 'Emily Chen',
    title: 'Luxury Property Specialist',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3',
    location: 'Coral Gables, FL',
    specialties: ['Luxury Estates', 'Penthouses', 'International Clients'],
    experience: 10,
    properties: 200,
    rating: 5.0,
    email: 'emily.c@redlynx.com',
    phone: '+1 (555) 345-6789',
  },
  {
    id: 4,
    name: 'David Thompson',
    title: 'Commercial Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3',
    location: 'Downtown Miami, FL',
    specialties: ['Commercial', 'Office Space', 'Retail Properties'],
    experience: 12,
    properties: 180,
    rating: 4.9,
    email: 'david.t@redlynx.com',
    phone: '+1 (555) 456-7890',
  },
  {
    id: 5,
    name: 'Lisa Martinez',
    title: 'Residential Property Expert',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3',
    location: 'Brickell, FL',
    specialties: ['Single Family Homes', 'Townhouses', 'First-time Buyers'],
    experience: 6,
    properties: 120,
    rating: 4.7,
    email: 'lisa.m@redlynx.com',
    phone: '+1 (555) 567-8901',
  },
  {
    id: 6,
    name: 'James Wilson',
    title: 'Investment Property Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3',
    location: 'South Beach, FL',
    specialties: ['Investment Properties', 'Property Management', 'Market Analysis'],
    experience: 9,
    properties: 165,
    rating: 4.8,
    email: 'james.w@redlynx.com',
    phone: '+1 (555) 678-9012',
  },
];

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const locations = [...new Set(agents.map(agent => agent.location))];
  const specialties = [...new Set(agents.flatMap(agent => agent.specialties))];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || agent.location === selectedLocation;
    const matchesSpecialty = !selectedSpecialty || agent.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Hero Section */}
      <div className="bg-dark-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Real Estate Agents</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet our team of experienced real estate professionals dedicated to helping
            you find your perfect property.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="py-8 bg-dark-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-900 rounded-lg border border-gray-700 focus:outline-none focus:border-primary-500"
              />
            </div>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-3 bg-dark-900 rounded-lg border border-gray-700 focus:outline-none focus:border-primary-500"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 bg-dark-900 rounded-lg border border-gray-700 focus:outline-none focus:border-primary-500"
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map(agent => (
              <div
                key={agent.id}
                className="bg-dark-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-300"
              >
                <div className="aspect-square relative">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-900 to-transparent p-6">
                    <h3 className="text-xl font-bold">{agent.name}</h3>
                    <p className="text-primary-400">{agent.title}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center text-gray-400">
                    <FiMapPin className="mr-2" />
                    {agent.location}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {agent.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-700">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">{agent.experience}</div>
                      <div className="text-sm text-gray-400">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">{agent.properties}</div>
                      <div className="text-sm text-gray-400">Properties</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">{agent.rating}</div>
                      <div className="text-sm text-gray-400">Rating</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${agent.email}`}
                      className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <FiMail className="mr-2" />
                      {agent.email}
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center text-gray-400 hover:text-primary-400 transition-colors"
                    >
                      <FiPhone className="mr-2" />
                      {agent.phone}
                    </a>
                  </div>
                  <button className="w-full py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                    Contact Agent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dark-800 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Join Our Team of Professionals</h2>
            <p className="text-gray-400 mb-8">
              Are you a real estate agent looking to take your career to the next level?
              Join RedLynx and become part of our growing team of professionals.
            </p>
            <button className="px-8 py-3 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 