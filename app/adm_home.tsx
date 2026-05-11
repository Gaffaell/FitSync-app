import { Link } from "expo-router";
import { StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function AdmScreen() {
  const colorScheme = useColorScheme();
  const cardBackground = colorScheme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = colorScheme === "dark" ? "#000" : "#0a7ea4";

  const linkCardStyle = {
    ...styles.card,
    backgroundColor: cardBackground,
    shadowColor: cardShadow,
  };

  return (
    <ThemedView
      style={styles.container}
      lightColor="#edf6ff"
      darkColor="#071014"
    >
      <ThemedText type="title" style={styles.heading}>
        Bem vindo(a)
      </ThemedText>
      <ThemedText
        type="subtitle"
        lightColor="#4b6570"
        darkColor="#9ca3af"
        style={styles.subtitle}
      >
        Gerencie alunos, treinos e feedbacks com rapidez e estilo.
      </ThemedText>

      <Link href="/adm_screens/cadastrar_aluno" dismissTo style={linkCardStyle}>
        <ThemedText
          type="defaultSemiBold"
          lightColor="#0f4c81"
          darkColor="#f8fafc"
          style={styles.cardText}
        >
          Cadastrar aluno
        </ThemedText>
      </Link>

      <Link
        href="/adm_screens/lista_exercicios"
        dismissTo
        style={linkCardStyle}
      >
        <ThemedText
          type="defaultSemiBold"
          lightColor="#0a7ea4"
          darkColor="#7dd3fc"
          style={styles.cardText}
        >
          Lista de exercícios da semana
        </ThemedText>
      </Link>

      <Link href="/adm_screens/lista_alunos" dismissTo style={linkCardStyle}>
        <ThemedText
          type="defaultSemiBold"
          lightColor="#6b42c1"
          darkColor="#c4b5fd"
          style={styles.cardText}
        >
          Lista de alunos
        </ThemedText>
      </Link>

      <Link href="/adm_screens/lista_feedbacks" dismissTo style={linkCardStyle}>
        <ThemedText
          type="defaultSemiBold"
          lightColor="#d9730a"
          darkColor="#fdba74"
          style={styles.cardText}
        >
          Lista de feedbacks
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  heading: {
    marginTop: 72,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    maxWidth: 360,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  accentText: {
    color: "#0a7ea4",
  },
  purpleText: {
    color: "#8b5cf6",
  },
  orangeText: {
    color: "#fb923c",
  },
});
