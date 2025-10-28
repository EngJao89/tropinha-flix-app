import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { Movie } from '@/@types/movies';
import { FavoriteItem } from '../../components/FavoriteItem';
import { Header } from '../../components/Header';
import { deleteMovie, getMoviesSave } from '../../utils/storage';
import { styles } from './styles';

export default function Movies() {
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@tropinhaflix');
      if (isActive) {
        setMovies(result as unknown as Movie[]);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id: string) {
    const result = await deleteMovie(id);
    setMovies(result as unknown as Movie[]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header title="Quero Assistir" />

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
