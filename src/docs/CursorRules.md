# Cursor IDE Project Rules

## 1. Code Organization 📁

### File Structure
- Keep related files close together
- Use consistent naming conventions
- Group by feature, not type
- Maximum file length: 500 lines

### Import Organization
```javascript
// 1. React and libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 2. Third-party components/utilities
import { motion } from 'framer-motion';

// 3. Local components
import { PropertyCard } from './PropertyCard';

// 4. Hooks, utilities, and constants
import { usePropertySearch } from '../hooks';
import { PROPERTY_TYPES } from '../constants';

// 5. Styles
import '../styles/property.css';
```

## 2. Error Prevention 🚫

### Type Checking
```javascript
// Use PropTypes until TypeScript migration
ComponentName.propTypes = {
  required: PropTypes.string.isRequired,
  optional: PropTypes.number,
  complex: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
};
```

### Error Boundaries
- Implement at route level
- Add for complex features
- Include error reporting
- Provide fallback UI

## 3. Performance Optimization 🚀

### Code Splitting
```javascript
// Lazy load routes
const PropertyDetails = React.lazy(() => import('./PropertyDetails'));

// Lazy load heavy components
const Map = React.lazy(() => import('./Map'));
```

### Memoization
```javascript
// Memoize expensive calculations
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Memoize callbacks
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

## 4. Development Workflow 🔄

### Branch Management
- feature/
- bugfix/
- hotfix/
- release/

### Commit Messages
```
type(scope): description

feat(property): add search filters
fix(auth): resolve login error
style(ui): update button styles
```

## 5. Testing Guidelines 🧪

### Test File Structure
```javascript
// ComponentName.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  it('should render correctly', () => {
    // Test
  });
});
```

## 6. Documentation 📚

### Component Documentation
```javascript
/**
 * @component PropertySearch
 * @description Search component for filtering properties
 * 
 * @param {Object} props
 * @param {Object} props.filters - Current filter state
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onSearch - Search trigger function
 * @param {string} props.type - Property type (buy/rent)
 * 
 * @example
 * <PropertySearch
 *   filters={filters}
 *   onFilterChange={handleFilterChange}
 *   onSearch={handleSearch}
 *   type="buy"
 * />
 */
```

## 7. Search Feature Organization 🔍

### Directory Structure
```
feature/
  ├── components/
  │   ├── SearchFilters/
  │   │   ├── SearchFilters.jsx
  │   │   └── index.js
  │   └── SearchResults/
  │       ├── SearchResults.jsx
  │       └── index.js
  ├── hooks/
  │   └── useSearch.js
  └── constants/
      └── filterOptions.js
```

### Search Component Pattern
```javascript
// SearchFilters.jsx
export const SearchFilters = ({ filters, onFilterChange, onReset }) => {
  // 1. Handle filter changes
  const handleChange = (key) => (e) => {
    onFilterChange(key, e.target.value);
  };

  // 2. Render filters
  return (
    <div className="filters-container">
      {/* Individual filters */}
    </div>
  );
};

// SearchResults.jsx
export const SearchResults = ({ 
  results, 
  loading, 
  error 
}) => {
  // 1. Handle loading state
  if (loading) return <LoadingSpinner />;

  // 2. Handle error state
  if (error) return <ErrorMessage message={error} />;

  // 3. Handle empty state
  if (!results.length) return <EmptyState />;

  // 4. Render results
  return (
    <div className="results-container">
      {results.map(item => (
        <ResultCard key={item.id} item={item} />
      ))}
    </div>
  );
};
```

### Search Hook Pattern
```javascript
export const useSearch = (initialFilters) => {
  // 1. State management
  const [filters, setFilters] = useState(initialFilters);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Search functionality
  const performSearch = useCallback(async () => {
    try {
      setLoading(true);
      // Implement search logic
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // 3. Filter management
  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    filters,
    results,
    loading,
    error,
    updateFilter,
    performSearch
  };
};
```

## 8. Error Prevention in Search Features 🚫

### Filter Validation
```javascript
const validateFilters = (filters) => {
  // Validate filter values
  if (filters.price && isNaN(filters.price)) {
    throw new Error('Invalid price filter');
  }
  
  // Validate date ranges
  if (filters.dateRange && !isValidDateRange(filters.dateRange)) {
    throw new Error('Invalid date range');
  }
};
```

### Error Boundaries
```javascript
class SearchErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <SearchErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 9. Cursor-Specific Features 🎯

### Snippets
```json
{
  "reactComponent": {
    "prefix": "rc",
    "body": [
      "import React from 'react';",
      "import PropTypes from 'prop-types';",
      "",
      "export const $1 = ({ $2 }) => {",
      "  return (",
      "    <div>",
      "      $3",
      "    </div>",
      "  );",
      "};",
      "",
      "$1.propTypes = {",
      "  $4: PropTypes.string",
      "};"
    ]
  }
}
```

### Keyboard Shortcuts
- `Cmd + Shift + P`: Command palette
- `Cmd + P`: Quick file open
- `Cmd + Shift + F`: Global search
- `Alt + Shift + F`: Format document

## 10. Code Review Process 👀

### Pre-Review Checklist
- [ ] Code formatted
- [ ] Tests passing
- [ ] PropTypes defined
- [ ] Error handling
- [ ] Console clean
- [ ] Documentation updated

### Review Comments
- Be specific
- Reference standards
- Suggest solutions
- Use code blocks

## 11. Debugging Tools 🔧

### React DevTools
- Components tab
- Profiler tab
- Props inspection
- State tracking

### Console Usage
```javascript
// Use structured logging
console.group('Property Search');
console.log('Filters:', filters);
console.log('Results:', results);
console.groupEnd();

// Use performance marks
performance.mark('searchStart');
// ... search operation
performance.mark('searchEnd');
performance.measure('search', 'searchStart', 'searchEnd');
```

## 12. Best Practices Checklist ✅

### Component Development
- [ ] PropTypes defined
- [ ] Error boundaries implemented
- [ ] Performance optimized
- [ ] Mobile responsive
- [ ] Accessibility checked
- [ ] Tests written
- [ ] Documentation added

### Feature Development
- [ ] Requirements reviewed
- [ ] Architecture documented
- [ ] Security considered
- [ ] Error handling implemented
- [ ] Performance tested
- [ ] Cross-browser tested 