import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import SeriesCard from '../components/SeriesCard';
import { searchContent, getTrending } from '../services/tmdb';

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get('q') || '';

  const [localQuery, setLocalQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalQuery(queryParam);
    const fetchResults = async () => {
      setLoading(true);
      try {
        if (queryParam) {
          const data = await searchContent(queryParam);
          // Filter out people (only show movies/tv)
          setResults(data.filter(item => item.media_type !== 'person'));
        } else {
          // Fallback to trending if no search query
          const data = await getTrending();
          setResults(data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Debounce or just fetch immediately since it's triggered by URL
    fetchResults();
  }, [queryParam]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <div className="pb-12 text-white w-full max-w-6xl mx-auto">
      <div className="relative w-full max-w-3xl mx-auto mb-12 mt-8">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <SearchIcon className="text-gray-400 w-6 h-6" />
        </div>
        <input 
          type="text" 
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for movies, series, or actors..." 
          className="w-full bg-[#1a1d29] border border-gray-800 text-white rounded-2xl py-6 pl-16 pr-8 text-xl focus:outline-none focus:border-primary-accent transition shadow-2xl"
        />
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
          {queryParam ? `Search Results for "${queryParam}"` : 'Suggested Titles'}
        </h2>
        
        {loading ? (
          <div className="flex justify-center py-20">
             <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {results.map(movie => (
              <SeriesCard key={movie.id} {...movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-500 mb-2">No results found</h3>
            <p className="text-gray-600">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
