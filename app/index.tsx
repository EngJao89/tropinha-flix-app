import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";

export default function Index() {
  const [input, setInput] = useState<string>('');
  return (
    <View style={styles.container}>
      <Header title="Tropinha Flix" />

      <View style={styles.searchContainer}>
        <Input
          placeholder="Ex Godfather"
          value={input}
          onChangeText={text => setInput(text)}
        />
      </View>
    </View>
  );
}