import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const { results, loading, error, searchFood } = useFoodSearch()

  return (
    <div className="page">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={searchFood} />
      {error && <ErrorMessage message={error} />}
      {loading && <p className="loading">Loading...</p>}
      {!loading && results.length === 0 && !error && (
        <p className="empty-state">Search for a food above to see its nutrition info.</p>
      )}
      <FoodList products={results} />
    </div>
  )
}

export default HomePage
