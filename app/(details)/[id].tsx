import { Feather, FontAwesome, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Movie } from "@/@types/movies";
import api, { key } from "@/lib/api";
import { deleteMovie, deleteWatchedMovie, hasMovie, hasWatchedMovie, saveMovie, saveWatchedMovie } from '@/utils/storage';

import { Genres } from "@/components/Genres";
import { ModalLink } from "@/components/ModalLink";
import { Colors } from "@/constants/theme";
import { styles } from "./styles";

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Partial<Movie>>({});
  const [openLink, setOpenLink] = useState(false);
  const [favoritedMovie, setFavoritedMovie] = useState(false);
  const [watchedMovie, setWatchedMovie] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      if (!id) return;

      try {
        const response = await api.get(`/movie/${id}`, {
          params: {
            api_key: key,
            language: 'pt-BR',
          },
        });

        if (isActive) {
          setMovie(response.data);

          const isFavorite = await hasMovie(response.data);
          const isWatched = await hasWatchedMovie(response.data);
          setFavoritedMovie(isFavorite);
          setWatchedMovie(isWatched);
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, [id]);

  async function handlefavoriteMovie(movie: Partial<Movie>) {
    if (
      movie.id &&
      movie.title &&
      movie.poster_path &&
      movie.overview &&
      movie.release_date &&
      movie.vote_average !== undefined
    ) {
      if (favoritedMovie) {
        await deleteMovie(String(movie.id));
        setFavoritedMovie(false);
        Alert.alert('Filme removido da sua lista');
      } else {
        await saveMovie('@tropinhaflix', { ...movie, id: Number(movie.id) } as any);
        setFavoritedMovie(true);
        Alert.alert('Filme salvo na sua lista!');
      }
    } else {
      console.error('O objeto do filme não está completo');
      return;
    }
  }

  async function handleWatchedMovie(movie: Partial<Movie>) {
    if (
      movie.id &&
      movie.title &&
      movie.poster_path &&
      movie.overview &&
      movie.release_date &&
      movie.vote_average !== undefined
    ) {
      if (watchedMovie) {
        await deleteWatchedMovie(String(movie.id));
        setWatchedMovie(false);
        Alert.alert('Filme removido da lista de assistidos');
      } else {
        await saveWatchedMovie('@tropinhaflix_watched', { ...movie, id: Number(movie.id) } as any);
        setWatchedMovie(true);
        Alert.alert('Filme marcado como assistido!');
      }
    } else {
      console.error('O objeto do filme não está completo');
      return;
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          style={styles.headerButton}>
          <Feather name="arrow-left" size={24} color={Colors.white} />
        </TouchableOpacity>
        
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => handlefavoriteMovie(movie)}
            style={styles.headerButton}>
            {favoritedMovie ? (
              <Fontisto name="bookmark-alt" size={24} color={Colors.white} />
            ) : (
              <Fontisto name="bookmark" size={24} color={Colors.white} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleWatchedMovie(movie)}
            style={styles.headerButton}>
            {watchedMovie ? (
              <FontAwesome name="check-circle" size={24} color={Colors.green_2} />
            ) : (
              <FontAwesome name="circle" size={24} color={Colors.white} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Image
        resizeMethod="resize"
        source={{
          uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        }}
        style={styles.banner}
      />

      <TouchableOpacity
        onPress={() => setOpenLink(true)}
        style={styles.buttonLink}>
        <MaterialCommunityIcons name="arrow-up-box" size={24} color={Colors.white} />
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>

      <View style={styles.contentArea}>
        <FontAwesome name="star" size={24} color={Colors.yellow_100} />
        <Text style={styles.rate}>{movie.vote_average}/10</Text>
      </View>

      <FlatList
        style={styles.listGenres}
        data={(movie as any)?.genres || []}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Genres data={item} />}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Descrição</Text>
        <Text style={styles.description}>{movie?.overview}</Text>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={openLink}>
        <ModalLink
          link={(movie as any)?.homepage || ''}
          title={movie?.title || ''}
          closeModal={() => setOpenLink(false)}
        />
      </Modal>
    </View>
  );
}
