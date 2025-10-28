import { Movie } from '@/@types/movies';
import { MovieRepository } from './repositories/MovieRepository';

export interface ServiceResult {
  success: boolean;
  message: string;
}

export class MovieService {
  private repository: MovieRepository;

  constructor() {
    this.repository = new MovieRepository();
  }

  async addToFavorites(movie: Movie): Promise<ServiceResult> {
    const favorites = await this.repository.getFavorites();
    
    if (favorites.some(item => item.id === movie.id)) {
      return { success: false, message: 'Esse filme já existe na sua lista' };
    }

    favorites.push(movie);
    await this.repository.saveFavorites(favorites);
    
    return { success: true, message: 'Filme salvo com sucesso!' };
  }

  async removeFromFavorites(movieId: string): Promise<Movie[]> {
    const favorites = await this.repository.getFavorites();
    const updatedFavorites = favorites.filter(item => item.id !== movieId);
    await this.repository.saveFavorites(updatedFavorites);
    return updatedFavorites;
  }

  async isFavorite(movie: Movie): Promise<boolean> {
    const favorites = await this.repository.getFavorites();
    return favorites.some(item => item.id === movie.id);
  }

  async addToWatched(movie: Movie): Promise<ServiceResult> {
    const watched = await this.repository.getWatched();
    
    if (watched.some(item => item.id === movie.id)) {
      return { success: false, message: 'Esse filme já existe na sua lista de assistidos' };
    }

    watched.push(movie);
    await this.repository.saveWatched(watched);
    
    return { success: true, message: 'Filme marcado como assistido!' };
  }

  async removeFromWatched(movieId: string): Promise<Movie[]> {
    const watched = await this.repository.getWatched();
    const updatedWatched = watched.filter(item => item.id !== movieId);
    await this.repository.saveWatched(updatedWatched);
    return updatedWatched;
  }

  async isWatched(movie: Movie): Promise<boolean> {
    const watched = await this.repository.getWatched();
    return watched.some(item => item.id === movie.id);
  }

  async getFavorites(): Promise<Movie[]> {
    return this.repository.getFavorites();
  }

  async getWatched(): Promise<Movie[]> {
    return this.repository.getWatched();
  }
}
