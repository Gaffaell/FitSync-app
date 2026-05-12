import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ExerciciosDia() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Exercicios do dia</ThemedText>
      {/*
        aqui mostra os exercicios do dia, pega as informaçoes do dia da semana 
        que o usuario clicou no banco de dados e exibe os exercicios do dia
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
