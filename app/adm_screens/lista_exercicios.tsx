import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";

export default function ListaExercicios() {
  const theme = useColorScheme();
  const containerBg = theme === "dark" ? "#071014" : "#edf6ff";
  const cardBg = theme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";
  const buttonBg = theme === "dark" ? "#1e293b" : "#e2e8f0";
  const buttonTextColor = theme === "dark" ? "#f8fafc" : "#0f172a";

  const DATA = [
    { id: "1", title: "Exercício 1" },
    { id: "2", title: "Exercício 2" },
    { id: "3", title: "Exercício 3" },
    { id: "4", title: "Exercício 4" },
    { id: "5", title: "Exercício 5" },
  ];

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: pressed ? "#6b42c1" : cardBg,
          shadowColor: cardShadow,
        },
      ]}
      onPress={() => console.log(`Abrir detalhes de ${title}`)}
    >
      <ThemedText
        type="defaultSemiBold"
        style={[styles.title, { color: buttonTextColor }]}
      >
        {title}
      </ThemedText>
    </Pressable>
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
          <Pressable style={[styles.button, { backgroundColor: "#6b42c1" }]}>
            <ThemedText style={styles.buttonText}>Voltar para Home</ThemedText>
          </Pressable>
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
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: 360,
    textAlign: "center",
    fontSize: 16,
  },
  list: {
    width: "100%",
    paddingBottom: 20,
    alignItems: "center",
  },
  item: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
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
  button: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
