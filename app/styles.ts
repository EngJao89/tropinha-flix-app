import { Colors, Fonts_Sizes } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray_900,
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 14,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 18,
  },
  title: {
    paddingTop: 20,
    paddingBottom: 8,
    fontSize: Fonts_Sizes.LG,
    fontWeight: 'bold',
    color: Colors.white,
    paddingLeft: 14,
    paddingRight: 14,
  },
  banner: {
    height: 150,
    borderRadius: 6,
  },
  sliderMovie: {
    height: 250,
    padding: 14,
  },
});
