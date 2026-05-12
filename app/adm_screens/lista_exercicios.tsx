import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { FlatList, ScrollView, StyleSheet, useColorScheme } from "react-native";

export default function ListaExercicios() {
  const theme = useColorScheme();
  const containerBg = theme === "dark" ? "#071014" : "#edf6ff";
  const cardBg = theme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";

  const DATA = [
    { id: "ksadief", title: "Exercício 1" },
    { id: "ksaadfksjdief", title: "Exercício 2" },
    { id: "ksadief12weefds", title: "Exercício 3" },
    { id: "ksadief235r3sdfasd", title: "Exercício 4" },
    { id: "ksadiefergkdvjfk", title: "Exercício 5" },
  ];

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <ThemedView
      style={[
        styles.item,
        { backgroundColor: cardBg, shadowColor: cardShadow },
      ]}
    >
      <ThemedText type="defaultSemiBold" style={styles.title}>
        {title}
      </ThemedText>
    </ThemedView>
  );

  return (
    <ScrollView>
      <ThemedView style={[styles.container, { backgroundColor: containerBg }]}>
        <ThemedText
          type="title"
          style={[styles.heading, { color: titleColor }]}
        >
          Exercícios
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={[styles.subtitle, { color: subtitleColor }]}
        >
          Liste e gerencie os exercícios disponíveis.
        </ThemedText>

        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />

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
    minHeight: "100%",
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  heading: {
    marginTop: 56,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: 360,
    textAlign: "center",
  },
  list: {
    width: "100%",
    paddingBottom: 20,
  },
  item: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
  cardLink: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
});
