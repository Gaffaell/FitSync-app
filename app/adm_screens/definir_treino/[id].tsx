import { Link, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

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

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Definir treino da semana</ThemedText>
        {weekDays.map((day) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/adm_screens/definir_treino/definir_treino_dia/[id]",
                params: {
                  dia: day.label
                    .toLocaleLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                  id: id.toString(),
                },
              })
            }
            key={day.label}
            style={[styles.card]}
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
        <Link href="/adm_home" dismissTo>
          <ThemedText type="defaultSemiBold" style={styles.cardText}>
            Voltar para Home
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
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
});
