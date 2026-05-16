import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";

const weekDays = [
  { label: "Segunda-feira", color: "#0f4c81" },
  { label: "Terça-feira", color: "#0a7ea4" },
  { label: "Quarta-feira", color: "#8b5cf6" },
  { label: "Quinta-feira", color: "#fb923c" },
  { label: "Sexta-feira", color: "#22c55e" },
  { label: "Sábado", color: "#22c55e" },
  { label: "Domingo", color: "#22c55e" },
];

const user_id = "bPmuD51VXGWUMaPHesEo"; // Substitua pelo ID do usuário logado

export default function ExerciciosSemana() {
  const colorScheme = useColorScheme();
  const cardBackground = colorScheme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = colorScheme === "dark" ? "#000" : "#0a7ea4";

  return (
    <ThemedView
      style={styles.container}
      lightColor="#edf6ff"
      darkColor="#071014"
    >
      <ThemedText type="title" style={styles.heading}>
        Plano de treinos
      </ThemedText>
      <ThemedText
        type="subtitle"
        lightColor="#4b6570"
        darkColor="#9ca3af"
        style={styles.subtitle}
      >
        Escolha o dia da semana para ver os exercícios planejados e começar seu
        treino com foco.
      </ThemedText>

      {weekDays.map((day) => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/user_screens/dia_semana/[id]",
              params: {
                dia: day.label
                  .toLocaleLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, ""),
                id: user_id,
              },
            })
          }
          key={day.label}
          style={[
            styles.card,
            { backgroundColor: cardBackground, shadowColor: cardShadow },
          ]}
        >
          <ThemedText
            type="defaultSemiBold"
            lightColor={day.color}
            darkColor={day.color}
            style={styles.cardText}
          >
            {day.label}
          </ThemedText>
        </Pressable>
      ))}
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
  homeCard: {
    marginTop: 12,
  },
});
