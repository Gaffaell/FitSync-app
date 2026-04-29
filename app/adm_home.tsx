import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function AdmScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bem vindo(a)</ThemedText>
      <Link
        href="/adm_screens/cadastrar_aluno"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="link" style={{ color: "red" }}>Cadastrar aluno</ThemedText>
      </Link>
      <Link
        href="/adm_screens/lista_exercicios"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="link" style={{ color: "#007bff" }}>Lista de exercicios da semana</ThemedText>
      </Link>
      <Link
        href="/adm_screens/lista_alunos"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="link" style={{ color: "purple" }}>Lista de alunos</ThemedText>
      </Link>
      <Link
        href="/adm_screens/lista_feedbacks"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="link" style={{ color: "yellow" }}>Lista de feedbacks</ThemedText>
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
