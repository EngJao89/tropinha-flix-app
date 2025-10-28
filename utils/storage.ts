import { Movie } from '@/@types/movies';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getMoviesSave(key: string): Promise<Movie[]> {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSave: Movie[] = myMovies ? JSON.parse(myMovies) : [];
  return moviesSave;
}

export async function saveMovie(key: string, newMovie: Movie): Promise<void> {
  let moviesStored = await getMoviesSave(key);

  const hasMovies = moviesStored.some(item => item.id === newMovie.id);

  if (hasMovies) {
    console.log('Esse filme já existe na sua lista');
    return;
  }

  moviesStored.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  console.log('Filme salvo com sucesso!!');
}

export async function deleteMovie(id: string): Promise<Movie[]> {
  let moviesStored = await getMoviesSave('@tropinhaflix');

  let myMovies = moviesStored.filter(item => item.id !== id);

  await AsyncStorage.setItem('@tropinhaflix', JSON.stringify(myMovies));
  console.log('Filme deletado com sucesso!');

  return myMovies;
}

export async function hasMovie(movie: Movie): Promise<boolean> {
  let moviesStored = await getMoviesSave('@tropinhaflix');

  const hasMovies = moviesStored.some(item => item.id === movie.id);

  return hasMovies;
}

export async function getWatchedMovies(key: string): Promise<Movie[]> {
  return getMoviesSave(key);
}

export async function saveWatchedMovie(key: string, newMovie: Movie): Promise<void> {
  let moviesStored = await getWatchedMovies(key);
  const hasMovies = moviesStored.some(item => item.id === newMovie.id);

  if (hasMovies) {
    console.log('Esse filme já existe na sua lista de assistidos');
    return;
  }

  moviesStored.push(newMovie);
  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
  console.log('Filme marcado como assistido!');
}

export async function deleteWatchedMovie(id: string): Promise<Movie[]> {
  let moviesStored = await getWatchedMovies('@tropinhaflix_watched');
  let myMovies = moviesStored.filter(item => item.id !== id);
  await AsyncStorage.setItem('@tropinhaflix_watched', JSON.stringify(myMovies));
  console.log('Filme removido da lista de assistidos!');
  return myMovies;
}

export async function hasWatchedMovie(movie: Movie): Promise<boolean> {
  let moviesStored = await getWatchedMovies('@tropinhaflix_watched');
  const hasMovies = moviesStored.some(item => item.id === movie.id);
  return hasMovies;
}
