import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { router, useLocalSearchParams } from "expo-router";

const weekDays = [
  { label: "Segunda-feira", color: "#0f4c81" },
  { label: "Terça-feira", color: "#0a7ea4" },
  { label: "Quarta-feira", color: "#8b5cf6" },
  { label: "Quinta-feira", color: "#fb923c" },
  { label: "Sexta-feira", color: "#22c55e" },
  { label: "Sábado", color: "#22c55e" },
  { label: "Domingo", color: "#22c55e" },
];

export default function ExerciciosSemana() {
  const { user_id } = useLocalSearchParams<{ user_id: string }>();
  const accentColor = useThemeColor({}, "accent");
  const buttonColor = useThemeColor({}, "button");
  const cardColor = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const textColor = useThemeColor(
    { light: "#111827", dark: "#F8FAFC" },
    "text",
  );
  const currentUserId = user_id ?? "";

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Plano de treinos
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Escolha o dia da semana para ver os exercícios planejados e começar
            seu treino com foco.
          </ThemedText>
        </ThemedView>

        <ThemedText
          type="default"
          style={[styles.userIdText, { color: textColor }]}
        >
          {currentUserId
            ? `ID do usuário: ${currentUserId}`
            : "Usuário não identificado. Faça login novamente."}
        </ThemedText>

        {weekDays.map((day) => (
          <Pressable
            disabled={!currentUserId}
            onPress={() =>
              router.push({
                pathname: "/user_screens/dia_semana/[user_id]",
                params: {
                  dia: day.label
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                  user_id: currentUserId,
                },
              })
            }
            key={day.label}
            style={({ pressed }) => [
              styles.card,
              {
                backgroundColor: cardColor,
                borderColor: accentColor,
                shadowColor: accentColor,
                opacity: pressed || !currentUserId ? 0.85 : 1,
              },
            ]}
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.cardText, { color: accentColor }]}
            >
              {day.label}
            </ThemedText>
          </Pressable>
        ))}
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
  heading: {
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
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
  },
  userIdText: {
    marginBottom: 16,
    textAlign: "center",
  },
  feedbackButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  feedbackButtonText: {
    color: "#111827",
    fontSize: 16,
  },
  homeCard: {
    marginTop: 12,
  },
});
