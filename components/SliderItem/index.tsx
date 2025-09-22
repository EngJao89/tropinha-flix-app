import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Movie } from '@/@types/movies';
import { Colors } from '@/constants/theme';
import { styles } from './styles';

interface SliderItemProps {
  data: Movie;
  navigatePage: (data: Movie) => void;
}

export function SliderItem({data, navigatePage}: SliderItemProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigatePage(data)}
      style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        }}
        style={styles.bannerItem}
      />
      <Text style={styles.title} numberOfLines={1}>
        {data.title}
      </Text>

      <View style={styles.rateContainer}>
        <FontAwesome name="star" size={24} color={Colors.yellow_100} />
        <Text style={styles.rate}>{data.vote_average}/10</Text>
      </View>
    </TouchableOpacity>
  );
}
