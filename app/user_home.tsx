import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function UserScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bem vindo(a)</ThemedText>
      <Link
        href="/user_screens/exercicios_da_semana"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="link">Lista de exercicios da semana</ThemedText>
      </Link>
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
