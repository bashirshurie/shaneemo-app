import { useState, useEffect } from 'react';
import { ChevronDown, Play, Sparkles, Loader2 } from 'lucide-react';
import SeriesCard from '../components/SeriesCard';
import { getPopularSeries } from '../services/tmdb';

export default function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getPopularSeries();
        setSeries(data);
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSeries();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full pt-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
      </div>
    );
  }

  const spotlight = series.length > 0 ? series[0] : null;

  return (
    <div className="pb-20 text-white w-full max-w-[1400px] mx-auto pt-4">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">EXPLORE / TV SERIES</div>
          <h1 className="text-4xl md:text-5xl font-black">
            Binge-Worthy <span className="text-primary-accent">Series</span>
          </h1>
        </div>
        
        <div className="flex flex-col items-end">
          <label className="text-xs text-gray-400 font-bold tracking-widest mb-2">FILTER BY SEASON</label>
          <button className="bg-gray-800/60 hover:bg-gray-700 transition px-4 py-2 rounded-lg flex items-center justify-between min-w-[180px] border border-gray-700/50">
            <span className="text-sm font-medium">All Seasons</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16">
        {series.map((item) => (
          <SeriesCard key={item.id} {...item} />
        ))}
      </div>

      {/* Spotlight Section */}
      {spotlight && (
        <div>
          <h2 className="text-xl font-bold mb-6">Premiere <span className="text-primary-accent">Spotlight</span></h2>
          
          <div className="flex flex-col lg:flex-row gap-6 h-[400px]">
            {/* Main Spotlight Video Card */}
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer group">
              <img 
                src={`https://image.tmdb.org/t/p/original${spotlight.backdrop_path}`} 
                alt={spotlight.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/90 via-dark-bg/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-10 flex flex-col justify-end w-full md:w-2/3">
                <span className="bg-primary-accent text-white text-xs font-black px-3 py-1 rounded-full w-fit mb-4">ORIGINAL SERIES</span>
                <h2 className="text-4xl md:text-5xl font-black mb-4 leading-none tracking-tight">{spotlight.name}</h2>
                <p className="text-sm text-gray-300 mb-8 max-w-md line-clamp-2">
                  {spotlight.overview}
                </p>
                <button className="bg-white text-black font-bold px-6 py-3 rounded-lg flex items-center w-fit gap-2 hover:bg-gray-200 transition">
                  <Play className="w-4 h-4 fill-current" /> WATCH TRAILER
                </button>
              </div>
            </div>

            {/* Curated Settings Card */}
            <div className="w-full lg:w-80 bg-gradient-to-b from-[#222532] to-[#1a1d29] rounded-2xl p-8 flex flex-col items-center justify-center text-center border-t border-primary-accent/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-primary-accent to-transparent opacity-50"></div>
              <Sparkles className="w-12 h-12 text-primary-accent mb-6" />
              <h3 className="text-xl font-bold mb-3">Curated for You</h3>
              <p className="text-sm text-gray-400 mb-8 max-w-[200px] leading-relaxed">
                Our AI analyzed your watch history to find your next obsession. Ready to dive in?
              </p>
              <button className="text-primary-accent font-bold text-xs tracking-widest hover:text-white transition">
                GENERATE PLAYLIST
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
