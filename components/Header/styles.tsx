import { Colors, Fonts_Sizes } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  drawerButton: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: Colors.white,
    fontSize: Fonts_Sizes.XL,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});