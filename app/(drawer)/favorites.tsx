import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export default function Favorites() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos</Text>
      <Text style={styles.subtitle}>Aqui você verá seus filmes favoritos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_900,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.gray_400,
    fontSize: 16,
    textAlign: 'center',
  },
});
