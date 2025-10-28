import { Movie } from '@/@types/movies';
import { MovieService, ServiceResult } from '@/services/MovieService';
import { useCallback, useState } from 'react';

export function useMovieStorage() {
  const [movieService] = useState(() => new MovieService());

  const addToFavorites = useCallback(async (movie: Movie): Promise<ServiceResult> => {
    return await movieService.addToFavorites(movie);
  }, [movieService]);

  const removeFromFavorites = useCallback(async (movieId: string): Promise<Movie[]> => {
    return await movieService.removeFromFavorites(movieId);
  }, [movieService]);

  const isFavorite = useCallback(async (movie: Movie): Promise<boolean> => {
    return await movieService.isFavorite(movie);
  }, [movieService]);

  const addToWatched = useCallback(async (movie: Movie): Promise<ServiceResult> => {
    return await movieService.addToWatched(movie);
  }, [movieService]);

  const removeFromWatched = useCallback(async (movieId: string): Promise<Movie[]> => {
    return await movieService.removeFromWatched(movieId);
  }, [movieService]);

  const isWatched = useCallback(async (movie: Movie): Promise<boolean> => {
    return await movieService.isWatched(movie);
  }, [movieService]);

  const getFavorites = useCallback(async (): Promise<Movie[]> => {
    return await movieService.getFavorites();
  }, [movieService]);

  const getWatched = useCallback(async (): Promise<Movie[]> => {
    return await movieService.getWatched();
  }, [movieService]);

  return {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToWatched,
    removeFromWatched,
    isWatched,
    getFavorites,
    getWatched,
  };
}
