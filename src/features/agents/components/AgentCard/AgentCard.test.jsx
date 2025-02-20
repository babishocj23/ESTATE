import { render, screen, fireEvent } from '@testing-library/react';
import { AgentCard } from './AgentCard';

const mockAgent = {
  _id: 1,
  fullName: "Sarah Johnson",
  title: "Senior Real Estate Agent",
  profileImage: "https://example.com/image.jpg",
  location: "Beverly Hills",
  experience: "8 years",
  rating: "4.9",
  email: "sarah.j@example.com",
  phone: "+1 (555) 123-4567",
  specialties: ["Luxury Homes", "Waterfront Properties"]
};

describe('AgentCard', () => {
  it('renders agent information correctly', () => {
    render(<AgentCard agent={mockAgent} />);
    
    expect(screen.getByText(mockAgent.fullName)).toBeInTheDocument();
    expect(screen.getByText(mockAgent.title)).toBeInTheDocument();
    expect(screen.getByText(mockAgent.location)).toBeInTheDocument();
    expect(screen.getByText(mockAgent.experience)).toBeInTheDocument();
  });

  it('handles missing optional properties gracefully', () => {
    const minimalAgent = {
      _id: 1,
      fullName: "John Doe",
      title: "Agent",
      profileImage: "https://example.com/image.jpg"
    };

    render(<AgentCard agent={minimalAgent} />);
    expect(screen.getByText(minimalAgent.fullName)).toBeInTheDocument();
  });

  it('toggles favorite state when clicking favorite button', () => {
    const onToggleFavorite = jest.fn();
    render(
      <AgentCard 
        agent={mockAgent} 
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />
    );

    const favoriteButton = screen.getByLabelText('Add to favorites');
    fireEvent.click(favoriteButton);
    expect(onToggleFavorite).toHaveBeenCalledWith(mockAgent._id);
  });

  it('toggles phone visibility when clicking phone button', () => {
    render(<AgentCard agent={mockAgent} />);
    
    const phoneButton = screen.getByText('*** *** ****');
    fireEvent.click(phoneButton);
    expect(screen.getByText(mockAgent.phone)).toBeInTheDocument();
  });

  it('handles image loading errors', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(<AgentCard agent={mockAgent} />);
    
    const image = screen.getByAltText(mockAgent.fullName);
    fireEvent.error(image);
    
    expect(image.src).toContain('/images/default-agent.jpg');
    expect(consoleSpy).toHaveBeenCalledWith('AgentCard: Failed to load agent image');
    
    consoleSpy.mockRestore();
  });

  it('renders specialties correctly', () => {
    render(<AgentCard agent={mockAgent} />);
    
    mockAgent.specialties.forEach(specialty => {
      expect(screen.getByText(specialty)).toBeInTheDocument();
    });
  });

  it('hides contact information when showContactInfo is false', () => {
    render(<AgentCard agent={mockAgent} showContactInfo={false} />);
    
    expect(screen.queryByText(mockAgent.email)).not.toBeInTheDocument();
    expect(screen.queryByText('*** *** ****')).not.toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <AgentCard agent={mockAgent} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });
}); 