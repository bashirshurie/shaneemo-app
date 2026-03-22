import { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';
import { getTrending, getPopularMovies } from '../services/tmdb';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trendingData, popularData] = await Promise.all([
          getTrending(),
          getPopularMovies()
        ]);
        setTrending(trendingData.slice(0, 8)); // Grab top 8
        setPopular(popularData.slice(0, 8)); // Grab top 8
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
      </div>
    );
  }

  const featured = trending[0];

  return (
    <div className="pb-12 text-white">
      <HeroBanner featuredMovie={featured} />
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.slice(1, 5).map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
