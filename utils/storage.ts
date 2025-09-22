import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
  id: number;
  title: string;
  [key: string]: any; // Pode-se adicionar outras propriedades conforme necessário
}

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

export async function deleteMovie(id: number): Promise<Movie[]> {
  let moviesStored = await getMoviesSave('@cineprime');

  let myMovies = moviesStored.filter(item => item.id !== id);

  await AsyncStorage.setItem('@cineprime', JSON.stringify(myMovies));
  console.log('Filme deletado com sucesso!');

  return myMovies;
}

export async function hasMovie(movie: Movie): Promise<boolean> {
  let moviesStored = await getMoviesSave('@cineprime');

  const hasMovies = moviesStored.some(item => item.id === movie.id);

  return hasMovies;
}
