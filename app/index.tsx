import { Header } from "@/components/Header";
import { View } from "react-native";
import { styles } from "./styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <Header title="Tropinha Flix" />
    </View>
  );
}