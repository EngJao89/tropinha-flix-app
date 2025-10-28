import { Movie } from '@/@types/movies';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class MovieRepository {
  private readonly FAVORITES_KEY = '@tropinhaflix';
  private readonly WATCHED_KEY = '@tropinhaflix_watched';

  async getFavorites(): Promise<Movie[]> {
    const data = await AsyncStorage.getItem(this.FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getWatched(): Promise<Movie[]> {
    const data = await AsyncStorage.getItem(this.WATCHED_KEY);
    return data ? JSON.parse(data) : [];
  }

  async saveFavorites(movies: Movie[]): Promise<void> {
    await AsyncStorage.setItem(this.FAVORITES_KEY, JSON.stringify(movies));
  }

  async saveWatched(movies: Movie[]): Promise<void> {
    await AsyncStorage.setItem(this.WATCHED_KEY, JSON.stringify(movies));
  }
}
