import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

import WebView from 'react-native-webview';
import { styles } from './styles';

interface ModalLinkProps {
  link: string;
  title: string;
  closeModal: () => void;
}

export function ModalLink({link, title, closeModal}: ModalLinkProps) {
  return (
    <>
      <TouchableOpacity style={styles.backButton} onPress={closeModal}>
        <Feather name="x" size={24} color="black" />
        <Text style={styles.name}>{title}</Text>
      </TouchableOpacity>

      <WebView source={{uri: link}} />
    </>
  );
}
