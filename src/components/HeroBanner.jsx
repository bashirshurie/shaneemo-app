import { Play, Info } from 'lucide-react';

export default function HeroBanner({ featuredMovie }) {
  if (!featuredMovie) return null;

  const title = featuredMovie.title || featuredMovie.name;
  const description = featuredMovie.overview;
  const imageUrl = `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`;

  return (
    <div className="relative w-full h-[65vh] md:h-[70vh] rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-2xl">
      <div className="absolute inset-0">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-16 w-full md:w-2/3 lg:w-1/2 flex flex-col justify-end z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-2 md:mb-4 drop-shadow-lg leading-tight line-clamp-2 md:line-clamp-none">{title}</h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 md:mb-6 drop-shadow-md line-clamp-3 leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full">
          <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold hover:bg-gray-200 transition shadow-lg text-base md:text-lg">
            <Play className="fill-current w-5 h-5" /> Play
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-500/50 backdrop-blur-md text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-bold hover:bg-gray-500/70 transition text-base md:text-lg">
            <Info className="w-5 h-5" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}
