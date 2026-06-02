import { Link } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function AdmScreen() {
  const accentColor = useThemeColor({}, "accent");
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const cardColor = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const textColor = useThemeColor(
    { light: "#111827", dark: "#F8FAFC" },
    "text",
  );
  const subtitleColor = useThemeColor(
    { light: "#475569", dark: "#94A3B8" },
    "text",
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Bem vindo(a)
          </ThemedText>
          <ThemedText style={[styles.heroSubtitle, { color: textColor }]}>
            Gerencie alunos, treinos e feedbacks com rapidez e estilo.
          </ThemedText>
        </ThemedView>

        <Link
          href="/adm_screens/cadastrar_aluno"
          dismissTo
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.cardText, { color: textColor }]}
          >
            Cadastrar aluno
          </ThemedText>
        </Link>

        <Link
          href="/adm_screens/lista_alunos"
          dismissTo
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.cardText, { color: textColor }]}
          >
            Lista de alunos
          </ThemedText>
        </Link>

        <Link
          href="/adm_screens/cadastrar_exercicio"
          dismissTo
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.cardText, { color: textColor }]}
          >
            Cadastrar exercício
          </ThemedText>
        </Link>

        <Link
          href="/adm_screens/lista_exercicios"
          dismissTo
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.cardText, { color: textColor }]}
          >
            Lista de exercícios
          </ThemedText>
        </Link>

        <Link
          href="/adm_screens/lista_feedbacks"
          dismissTo
          style={[
            styles.card,
            {
              backgroundColor: cardColor,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.cardText, { color: textColor }]}
          >
            Lista de feedbacks
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
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
    borderWidth: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
