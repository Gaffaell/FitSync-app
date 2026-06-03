import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

const weekDays = [
  { label: "Segunda-feira", color: "#0f4c81" },
  { label: "Terça-feira", color: "#0a7ea4" },
  { label: "Quarta-feira", color: "#8b5cf6" },
  { label: "Quinta-feira", color: "#fb923c" },
  { label: "Sexta-feira", color: "#22c55e" },
  { label: "Sábado", color: "#22c55e" },
  { label: "Domingo", color: "#22c55e" },
];

export default function DefinirTreino() {
  const { id } = useLocalSearchParams();
  const accentColor = useThemeColor({}, "accent");
  const buttonColor = useThemeColor({}, "button");
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const cardBackground = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const textColor = useThemeColor({}, "text");
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
            Definir treino da semana
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Escolha o dia do aluno para criar ou editar o treino semanal.
          </ThemedText>
        </ThemedView>

        <View style={styles.cardsWrapper}>
          {weekDays.map((day) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname:
                    "/adm_screens/definir_treino/definir_treino_dia/[id]",
                  params: {
                    dia: day.label
                      .toLocaleLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, ""),
                    id: id?.toString(),
                  },
                })
              }
              key={day.label}
              style={[
                styles.card,
                {
                  backgroundColor: cardBackground,
                  borderColor: accentColor,
                  shadowColor: accentColor,
                },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[styles.cardText, { color: day.color }]}
              >
                {day.label}
              </ThemedText>
              <ThemedText
                style={[styles.cardSubtitle, { color: subtitleColor }]}
              >
                Selecione para ajustar treinos
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <Link href="/adm_home" dismissTo style={[styles.linkButton]}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.linkText, { color: accentColor }]}
          >
            Voltar para Home
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
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
    color: "rgba(255,255,255,0.9)",
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  cardsWrapper: {
    width: "100%",
    maxWidth: 520,
  },
  card: {
    width: "100%",
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
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 12,
  },
  linkText: {
    fontSize: 16,
  },
});
