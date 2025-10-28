import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { Movie } from "@/@types/movies";
import { useMovieStorage } from '@/hooks/useMovieStorage';

import { FavoriteItem } from "@/components/FavoriteItem";
import { Header } from "@/components/Header";
import { styles } from "./styles";

export default function Watch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { getWatched, removeFromWatched } = useMovieStorage();

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      const result = await getWatched();
      if (isActive) {
        setMovies(result);
        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
    };
  }, [getWatched]);

  async function handleDelete(id: string) {
    const result = await removeFromWatched(id);
    setMovies(result);
  }

  function handleNavigate(movie: Movie) {
    router.push(`/(details)/${movie.id}`);
  }

  return (
    <View style={styles.container}>
      <Header title="Filmes assistidos" />
      
      {loading ? (
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <FavoriteItem
              data={item}
              deleteMovie={handleDelete}
              navigatePage={handleNavigate}
            />
          )}
        />
      )}
    </View>
  );
}
