import { useState, useEffect } from 'react';
import { TrendingUp, Loader2 } from 'lucide-react';
import { getTopRatedMovies } from '../services/tmdb';

export default function MyList() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const data = await getTopRatedMovies();
        setCollection(data);
      } catch (error) {
        console.error("Error fetching top rated:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchList();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
      </div>
    );
  }

  const myList = collection.slice(0, 5);
  const recommendation = collection.length > 5 ? collection[5] : null;

  return (
    <div className="pb-20 text-white w-full max-w-5xl mx-auto pt-4 relative z-0">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black mb-3">My List</h1>
        <p className="text-gray-400">
          You have <span className="text-primary-accent font-bold">{myList.length} items</span> saved in your collection.
        </p>
      </div>

      <div className="flex flex-col gap-4 mb-16">
        {myList.map(item => (
          <div key={item.id} className="bg-gray-800/20 hover:bg-gray-800/40 transition-colors border border-gray-800/50 rounded-2xl p-5 flex flex-col md:flex-row items-center text-center md:text-left group cursor-pointer">
            <div className="w-full md:w-[280px] h-[200px] md:h-[160px] rounded-xl overflow-hidden shrink-0 shadow-lg shadow-black/20 mb-4 md:mb-0">
              <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            
            <div className="flex-1 px-4 md:px-8 w-full flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
              <div className="flex items-center gap-3">
                <span className="bg-[#4b5563] text-green-300 px-2 py-0.5 rounded text-xs font-bold leading-none tracking-wider">
                  {Math.round((item.vote_average || 0) * 10)}% Match
                </span>
                <span className="text-sm text-gray-400 font-medium">Top Rated</span>
              </div>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2 max-w-md">{item.overview}</p>
            </div>
            
            <div className="text-gray-400 font-medium w-full md:w-24 text-center my-4 md:my-0">
              {item.release_date ? item.release_date.substring(0, 4) : ''}
            </div>
            
            <div className="pl-0 md:pl-6 w-full md:w-auto">
              <button className="bg-gradient-to-r from-[#ff52a2] to-[#fd4196] text-white font-bold text-xs tracking-widest px-8 py-4 rounded-xl shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all w-full whitespace-nowrap">
                WATCH NOW
              </button>
            </div>
          </div>
        ))}
      </div>

      {recommendation && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-8">Because you like these...</h2>
          
          <div className="flex flex-col lg:flex-row gap-6 h-[400px]">
            {/* Main Recommendation Card */}
            <div className="relative flex-1 rounded-3xl overflow-hidden shadow-2xl group cursor-pointer group">
              <img 
                src={`https://image.tmdb.org/t/p/original${recommendation.backdrop_path}`} 
                alt={recommendation.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-[#11131a]/60 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-10 flex flex-col justify-end w-full">
                <span className="text-primary-accent text-xs font-black tracking-widest uppercase mb-4">RECOMMENDED FOR YOU</span>
                <h3 className="text-4xl md:text-5xl font-black mb-6">{recommendation.title}</h3>
                <button className="bg-gray-800/80 backdrop-blur-md border border-gray-600 text-white font-bold text-xs tracking-widest px-6 py-4 rounded-xl w-fit hover:bg-gray-700 transition">
                  ADD TO MY LIST
                </button>
              </div>
            </div>

            {/* Trending Action Side Card */}
            <div className="w-full lg:w-80 bg-gradient-to-b from-[#1a1d29] to-[#11131a] rounded-3xl p-10 flex flex-col justify-center border border-gray-800/50 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-accent/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-primary-accent/20"></div>
              <TrendingUp className="w-10 h-10 text-primary-accent mb-6" />
              <h3 className="text-2xl font-black mb-4">Trending Action</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Discover what other premium members are adding to their lists this week.
              </p>
              <a href="#" className="text-white font-bold text-sm tracking-wide underline decoration-primary-accent decoration-2 underline-offset-8 hover:text-primary-accent transition-colors">
                Explore All Trending
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
