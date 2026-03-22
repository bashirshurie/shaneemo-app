import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
  },
});

export const getTrending = async () => {
  const { data } = await tmdb.get('/trending/all/day');
  return data.results;
};

export const getPopularMovies = async () => {
  const { data } = await tmdb.get('/movie/popular');
  return data.results;
};

export const getPopularSeries = async () => {
  const { data } = await tmdb.get('/tv/popular');
  return data.results;
};

export const getMovieDetails = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}?append_to_response=credits,videos`);
  return data;
};

export const getMovieVideos = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}/videos`);
  return data.results;
};

export const getSeriesDetails = async (id) => {
  const { data } = await tmdb.get(`/tv/${id}?append_to_response=credits,videos`);
  return data;
};

export const getSeriesVideos = async (id) => {
  const { data } = await tmdb.get(`/tv/${id}/videos`);
  return data.results;
};

export const searchContent = async (query) => {
  const { data } = await tmdb.get('/search/multi', { params: { query } });
  return data.results;
};

export const getTopRatedMovies = async () => {
  const { data } = await tmdb.get('/movie/top_rated');
  return data.results;
};

export const getMoviesByGenre = async (genreId) => {
  const { data } = await tmdb.get('/discover/movie', { params: { with_genres: genreId } });
  return data.results;
};
