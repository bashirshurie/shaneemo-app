import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import SeriesCard from '../components/SeriesCard';
import { getMoviesByGenre } from '../services/tmdb';

export default function Action() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const data = await getMoviesByGenre(28); // 28 is Action in TMDB
        setMovies(data);
      } catch (error) {
        console.error("Error fetching action movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAction();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
      </div>
    );
  }

  return (
    <div className="pb-20 text-white w-full max-w-[1400px] mx-auto pt-4">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">EXPLORE / GENRE</div>
          <h1 className="text-4xl md:text-5xl font-black">
            High-Octane <span className="text-primary-accent">Action</span>
          </h1>
          <p className="text-gray-400 mt-2">Dive into the most thrilling and explosive movies.</p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
        {movies.map((item) => (
          <SeriesCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
