import { useEffect } from 'react';
import { useAgentSearch } from '../features/agents/hooks/useAgentSearch';
import { AgentFilters } from '../features/agents/components/AgentFilters/AgentFilters';
import { AgentSearchResults } from '../features/agents/components/AgentSearchResults/AgentSearchResults';
import { useFavorites } from '../hooks/useFavorites';
import { PageHeader } from '../components/common/PageHeader';
import { useTitle } from '../hooks/useTitle';

const AgentSearchPage = () => {
  const {
    agents,
    loading,
    error,
    filters,
    totalAgents,
    updateFilter,
    resetFilters,
  } = useAgentSearch();

  const { favorites, toggleFavorite } = useFavorites('favoriteAgents');

  // Update page title
  useTitle('Find an Agent | Estate');

  // Reset filters on unmount
  useEffect(() => {
    return () => resetFilters();
  }, [resetFilters]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Page Header */}
      <PageHeader
        title="Find Your Perfect Agent"
        subtitle="Search and connect with experienced real estate professionals"
      />

      {/* Filters Section */}
      <section>
        <AgentFilters
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        />
      </section>

      {/* Results Section */}
      <section>
        <AgentSearchResults
          agents={agents}
          loading={loading}
          error={error}
          totalAgents={totalAgents}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </section>
    </div>
  );
};

export default AgentSearchPage; 