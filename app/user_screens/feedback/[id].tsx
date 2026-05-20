import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function UserScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Hora do feedback</ThemedText>
      {/* 
        aqui o usuario pode dar feedback sobre os exercicios
        facil, moderado ou dificil
        pega o texto detalhado e manda tudo para o banco de dados
        */}
      <Link href="/user_home" dismissTo style={styles.link}>
        <ThemedText type="link">HOME</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
