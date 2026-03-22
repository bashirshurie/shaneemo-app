import { useState, useEffect } from 'react';
import { Star, Play, X, Loader2 } from 'lucide-react';
import SeriesCard from '../components/SeriesCard';
import { getPopularMovies, getMovieDetails } from '../services/tmdb';
import ReactPlayer from 'react-player';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playingTrailer, setPlayingTrailer] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
        if (data.length > 0) {
          setSelectedMovie(data[0]);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!selectedMovie) return;
      try {
        setMovieDetails(null);
        setPlayingTrailer(false);
        const details = await getMovieDetails(selectedMovie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchDetails();
  }, [selectedMovie]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-primary-accent" />
      </div>
    );
  }

  // Find trailer
  const trailer = movieDetails?.videos?.results?.find(vid => vid.type === 'Trailer' && vid.site === 'YouTube');

  return (
    <div className="flex w-full text-white items-start">
      {/* Main Content Area */}
      <div className={`flex-1 transition-all duration-300`}>
        <div className="mb-12 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Explore <span className="text-primary-accent pb-1">Cinema</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
            Curated masterpieces and blockbusters from around the globe, selected for the true digital auteur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {movies.map(movie => (
            <div key={movie.id} onClick={() => setSelectedMovie(movie)}>
              <SeriesCard {...movie} />
            </div>
          ))}
        </div>
      </div>

      {/* Persistence Details Panel */}
      {selectedMovie && (
        <div className="w-[380px] shrink-0 bg-[#16181e] border border-gray-800/50 p-8 flex flex-col sticky top-4 h-[calc(100vh-140px)] overflow-y-auto hidden lg:flex rounded-3xl ml-8 shadow-2xl">
          <button className="absolute top-4 right-4 text-gray-500 hover:text-white bg-black/20 rounded-full p-2 z-10" onClick={() => setSelectedMovie(null)}>
             <X className="w-5 h-5" />
          </button>
          
          <div className="relative w-full h-56 rounded-xl overflow-hidden mb-8 -mt-2 bg-black">
             {playingTrailer && trailer ? (
                <ReactPlayer 
                  url={`https://www.youtube.com/watch?v=${trailer.key}`} 
                  width="100%" 
                  height="100%" 
                  playing 
                  controls 
                />
             ) : (
               <>
                 <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path || selectedMovie.poster_path}`} className="w-full h-full object-cover opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#16181e] via-transparent to-transparent" />
               </>
             )}
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-primary-accent/20 text-primary-accent px-3 py-1 rounded text-xs font-black tracking-widest">FEATURED NOW</span>
            <div className="flex items-center text-white text-sm font-bold">
               <Star className="w-4 h-4 mr-1 text-green-400 fill-green-400" /> {selectedMovie.vote_average ? selectedMovie.vote_average.toFixed(1) : 'NR'}
            </div>
          </div>

          <h2 className="text-4xl font-black mb-3 tracking-tight leading-tight">{selectedMovie.title || selectedMovie.name}</h2>
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-bold tracking-widest mb-8">
            <span>{selectedMovie.release_date ? selectedMovie.release_date.substring(0, 4) : ''}</span>
            {movieDetails?.runtime && (
              <>
                <span>•</span>
                <span>{movieDetails.runtime} min</span>
              </>
            )}
            {movieDetails?.genres && (
              <>
                <span>•</span>
                <span>{movieDetails.genres.map(g => g.name).join(', ')}</span>
              </>
            )}
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-8">
            {selectedMovie.overview}
          </p>

          {!movieDetails ? (
            <div className="flex justify-center my-4"><Loader2 className="w-6 h-6 animate-spin text-gray-500" /></div>
          ) : (
             <>
               <div className="mb-6">
                 <p className="text-xs text-primary-accent font-black tracking-widest mb-3 uppercase">Starring</p>
                 <div className="flex flex-wrap gap-2">
                   {movieDetails.credits?.cast?.slice(0, 4).map(actor => (
                     <span key={actor.id} className="bg-gray-800/60 border border-gray-700 text-xs px-4 py-1.5 rounded-full text-gray-300 font-medium">{actor.name}</span>
                   ))}
                 </div>
               </div>

               <div className="mb-8">
                 <p className="text-xs text-primary-accent font-black tracking-widest mb-2 uppercase">Director</p>
                 <p className="text-sm font-bold">
                   {movieDetails.credits?.crew?.find(c => c.job === 'Director')?.name || 'Unknown'}
                 </p>
               </div>
             </>
          )}

          <div className="mt-auto flex flex-col gap-3">
             <button 
               onClick={() => setPlayingTrailer(true)}
               disabled={!trailer}
               className={`text-white font-black py-4 rounded-xl flex justify-center items-center gap-2 transition w-full shadow-lg ${trailer ? 'bg-[#ff52a2] hover:bg-pink-500 shadow-pink-500/20' : 'bg-gray-700 cursor-not-allowed text-gray-400'}`}>
               <Play className="w-4 h-4 fill-current" /> {trailer ? 'WATCH TRAILER' : 'NO TRAILER'}
             </button>
             <button className="border border-gray-700 bg-transparent text-gray-300 font-bold py-4 rounded-xl hover:bg-gray-800 transition w-full">
               ADD TO WATCHLIST
             </button>
          </div>
        </div>
      )}
    </div>
  );
}
