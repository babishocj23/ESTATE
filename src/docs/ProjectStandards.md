# Estate Project Standards & Guidelines

## 1. Technology Stack 🛠

### Core Technologies
- **React 18+**: Modern UI development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Build tool and development server
- **Supabase**: Backend and authentication

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **React DevTools**: Debugging and profiling
- **Cursor IDE**: Primary development environment

## 2. Architecture & Organization 🏗

### Feature-based Structure
```
src/
  ├── features/           # Feature modules
  │   └── properties/     # Property feature
  │       ├── components/ # Feature-specific components
  │       ├── hooks/      # Custom hooks
  │       ├── styles/     # Feature styles
  │       └── constants/  # Feature constants
  │   └── agents/         # Agent feature
  │       ├── components/
  │       │   ├── AgentCard/
  │       │   │   ├── AgentCard.jsx
  │       │   │   ├── AgentCard.test.jsx
  │       │   │   └── index.js
  │       │   ├── AgentFilters/
  │       │   └── AgentSearchResults/
  │       ├── hooks/
  │       │   └── useAgentSearch.js
  │       └── constants/
  │           └── filterOptions.js
  ├── components/         # Shared components
  ├── hooks/             # Shared hooks
  ├── utils/             # Utility functions
  ├── styles/            # Global styles
  └── docs/              # Documentation
```

### Mobile-First Development
- Start with mobile layout
- Use Tailwind's responsive prefixes
- Test on multiple devices
- Maintain consistent spacing

### Search Features Organization
- **Properties Search**
  - Property filters
  - Property cards
  - Search results

- **Agent Search** (New)
  - Agent filters
  - Agent cards
  - Search results
  - Favorites integration

## 3. Coding Standards 📝

### Component Structure
```javascript
// Example: AgentCard.jsx
import PropTypes from 'prop-types';

export const ComponentName = ({ prop1, prop2 }) => {
  // 1. State and Hooks
  const [state, setState] = useState(null);

  // 2. Error Handling
  if (!requiredProp) {
    console.error('Missing required prop');
    return null;
  }

  // 3. Event Handlers
  const handleEvent = () => {
    // Event logic
  };

  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};
```

### Search Feature Implementation
```javascript
// Example: useAgentSearch hook
export const useSearch = () => {
  // 1. State Management
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Search Logic
  const performSearch = async () => {
    try {
      setLoading(true);
      // Search implementation
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    performSearch
  };
};
```

### Error Handling
```javascript
// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 4. Responsive Design Guidelines 📱

### Breakpoint System
```javascript
// Tailwind breakpoints
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablets
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px'  // Extra large screens
}
```

### Responsive Utilities
```javascript
// useResponsive hook
export const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024
  };
};
```

### Search Components
```javascript
// Mobile-first grid system
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} item={item} />
  ))}
</div>

// Responsive filters
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Filter />
</div>
```

## 5. Performance Guidelines ⚡

### Code Splitting
- Use lazy loading for routes
- Split large components
- Implement dynamic imports

### Image Optimization
- Use responsive images
- Implement lazy loading
- Optimize for WebP format
- Use appropriate sizes

### Search Optimization
- Debounced search inputs
- Pagination for results
- Memoized filter components
- Error boundary implementation

### State Management
- Use local state for UI
- Context for shared state
- Avoid prop drilling
- Implement memoization

## 6. Testing Strategy 🧪

### Component Testing
```javascript
// Example: AgentCard.test.jsx
describe('AgentCard', () => {
  it('renders correctly', () => {
    render(<AgentCard agent={mockAgent} />);
    expect(screen.getByText(mockAgent.name)).toBeInTheDocument();
  });

  it('handles missing data', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<AgentCard agent={{}} />);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
```

### Test Coverage Goals
- Components: 80%
- Utilities: 90%
- Critical paths: 100%

## 7. Deployment & CI/CD 🚀

### Build Process
1. Lint check
2. Type check
3. Run tests
4. Build optimization
5. Asset compression

### Environment Setup
- Development
- Staging
- Production

## 8. Future Improvements 🔄

### Planned Enhancements
1. TypeScript Migration
2. Comprehensive Testing
3. Performance Monitoring
4. Error Tracking
5. Analytics Integration

### Monitoring & Maintenance
- Regular dependency updates
- Performance monitoring
- Error tracking
- User analytics

## 9. Contributing Guidelines 👥

### Pull Request Process
1. Create feature branch
2. Follow coding standards
3. Add tests
4. Update documentation
5. Request review

### Code Review Checklist
- [ ] Follows project standards
- [ ] Includes tests
- [ ] Mobile-responsive
- [ ] Error handling
- [ ] Performance considered
- [ ] Documentation updated

## 10. Resources & Tools 📚

### Documentation
- React Docs
- Tailwind Docs
- Vite Docs
- Supabase Docs

### Development Tools
- Chrome DevTools
- React DevTools
- Lighthouse
- PageSpeed Insights 