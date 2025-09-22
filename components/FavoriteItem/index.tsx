import { FontAwesome } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { styles } from './styles';

interface Movie {
  id: number;
  title: string;
  vote_average: number;
  [key: string]: any;
}

interface FavoriteItemProps {
  data: Movie;
  deleteMovie: (id: number) => void;
  navigatePage: (movie: Movie) => void;
}

export function FavoriteItem({
  data,
  deleteMovie,
  navigatePage,
}: FavoriteItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>

      <View style={styles.rateContainer}>
        <FontAwesome name="star" size={24} color={Colors.yellow_100} />
        <Text style={styles.rate}>{data.vote_average}/10</Text>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => navigatePage(data)}>
          <Text style={styles.title}>Ver Detalhes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteMovie(data.id)}>
          <FontAwesome name="trash" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
