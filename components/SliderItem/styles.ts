import { Colors, Fonts_Sizes } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 16,
    width: 140,
  },
  bannerItem: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontSize: Fonts_Sizes.SM,
    paddingTop: 8,
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  rate: {
    paddingLeft: 4,
    color: Colors.white,
    fontSize: Fonts_Sizes.XS,
  },
});
