import { Text, View } from 'react-native';
import { styles } from './styles';

interface GenresProps {
  data: {
    name: string;
  };
}

export function Genres({data}: GenresProps) {
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  );
}
