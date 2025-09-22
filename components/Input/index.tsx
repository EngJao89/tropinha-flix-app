import { useState } from 'react';
import {
  ActivityIndicator,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors } from '@/constants/theme';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles } from './styles';


type Props = TextInputProps & {
  isLoading?: boolean;
};

export function Input({isLoading = false, ...rest}: Props) {
  const [input, setInput] = useState<string>('');
  const navigation = useNavigation();

  function handleSearchMovie() {
    if (input === '') return;

    (navigation as any).navigate('search', { name: input });
    setInput('');
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.gray_200}
        {...rest}
      />

      {isLoading && <ActivityIndicator color={Colors.blue_light} />}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearchMovie}>
        <FontAwesome6 name="magnifying-glass" size={16} color={Colors.gray_200}/>
      </TouchableOpacity>
    </View>
  );
}
