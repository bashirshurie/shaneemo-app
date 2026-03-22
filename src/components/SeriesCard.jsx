import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SeriesCard({ title, name, poster_path, vote_average, genre_ids }) {
  const displayTitle = title || name;
  const rating = vote_average ? vote_average.toFixed(1) : 'NR';
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <motion.div 
      className="flex flex-col cursor-pointer group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden mb-4 shadow-lg shadow-black/20">
        <img 
          src={imageUrl} 
          alt={displayTitle} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-dark-bg/80 backdrop-blur-sm px-2 py-1 rounded w-fit flex items-center space-x-1 border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-bold">{rating}</span>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-accent transition-colors truncate">{displayTitle}</h3>
        <p className="text-xs text-gray-400 font-medium">Trending</p>
      </div>
    </motion.div>
  );
}
