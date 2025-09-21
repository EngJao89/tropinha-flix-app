import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';


import { Colors } from '@/constants/theme';
import { styles } from './styles';

type HeaderProps = {
  title: string;
};

export function Header({title}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={styles.drawerButton}>
        <Ionicons name="film" size={24} color={Colors.white} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
