import { Colors, Fonts_Sizes } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
  title: {
    color: Colors.white,
    fontSize: Fonts_Sizes.LG,
    fontWeight: 'bold',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  rate: {
    color: Colors.white,
    fontSize: Fonts_Sizes.XS,
    paddingLeft: 12,
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButton: {
    width: '85%',
    height: 30,
    backgroundColor: Colors.red_100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  deleteButton: {
    width: '15%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
