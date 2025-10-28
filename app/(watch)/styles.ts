import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray_700,
    paddingTop: 4,
    paddingBottom: 4,
  },
  loadingText: {
    color: Colors.white,
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});