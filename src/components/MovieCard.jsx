import { Play, Plus, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MovieCard({ title, name, poster_path, vote_average, release_date, first_air_date }) {
  const displayTitle = title || name;
  const rating = vote_average ? Math.round(vote_average * 10) : 0;
  const year = release_date ? release_date.substring(0, 4) : first_air_date ? first_air_date.substring(0, 4) : '';
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <motion.div 
      className="relative group w-full h-80 rounded-xl overflow-hidden bg-dark-surface cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={imageUrl} alt={displayTitle} className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50" />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end z-10">
        <h3 className="text-lg font-bold text-white mb-1 truncate">{displayTitle}</h3>
        <div className="flex items-center text-sm text-gray-300 space-x-3 mb-3">
          <span className="text-green-400 font-semibold">{rating}% Match</span>
          <span>{year}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition">
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button className="border border-white/50 bg-black/50 text-white p-2 rounded-full hover:bg-white/20 transition">
            <Plus className="w-4 h-4" />
          </button>
          <button className="border border-white/50 bg-black/50 text-white p-2 rounded-full ml-auto hover:bg-white/20 transition">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
