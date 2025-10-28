import { Movie } from '@/@types/movies';

export function getListMovies(size: number, movies: Movie[]): Movie[] {
  let popularMovies: Movie[] = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }
  return popularMovies;
}

export function randomBanner(movies: Movie[]): number {
  return Math.floor(Math.random() * movies.length);
}
