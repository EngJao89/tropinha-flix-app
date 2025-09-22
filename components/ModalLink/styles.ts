import { Colors, Fonts_Sizes } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    backgroundColor: Colors.gray_700,
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 8,
    color: Colors.white,
    fontSize: Fonts_Sizes.MD,
    fontWeight: 'bold',
  },
});
