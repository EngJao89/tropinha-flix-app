import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Movie } from '@/@types/movies';
import { FavoriteItem } from '../../components/FavoriteItem';
import { Header } from '../../components/Header';
import { deleteWatchedMovie, getWatchedMovies } from '../../utils/storage';
import { styles } from './styles';

export default function Watch() {
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isActive = true;

    async function getWatchedMoviesList() {
      const result = await getWatchedMovies('@tropinhaflix_watched');
      if (isActive) {
        setMovies(result as unknown as Movie[]);
      }
    }

    if (isActive) {
      getWatchedMoviesList();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id: number) {
    const result = await deleteWatchedMovie(id);
    setMovies(result as unknown as Movie[]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Já Assistido" />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={ ({ item }) => (
          <FavoriteItem
            data={item as any}
            deleteMovie={handleDelete}
            navigatePage={() => router.push(`/(details)/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
