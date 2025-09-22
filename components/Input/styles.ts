
import { Colors, Fonts_Sizes } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    backgroundColor: Colors.gray_600,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: Fonts_Sizes.MD,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: Colors.white,
  },
  searchButton: {
    width: '15%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
