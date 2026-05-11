import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { FlatList, StyleSheet, useColorScheme } from "react-native";

export default function ListaFeedbacks() {
  const theme = useColorScheme();
  const containerBg = theme === "dark" ? "#071014" : "#edf6ff";
  const cardBg = theme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";
  const homeLinkStyle = {
    ...styles.card,
    backgroundColor: cardBg,
    shadowColor: cardShadow,
  };

  const DATA = [
    { id: "ksadief", title: "feedback 1" },
    { id: "ksaadfksjdief", title: "feedback 2" },
    { id: "ksadief12weefds", title: "feedback 3" },
    { id: "ksadief235r3sdfasd", title: "feedback 4" },
    { id: "ksadiefergkdvjfk", title: "feedback 5" },
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
    <ThemedView style={[styles.container, { backgroundColor: containerBg }]}>
      <ThemedText type="title" style={[styles.heading, { color: titleColor }]}>
        Feedbacks
      </ThemedText>
      <ThemedText
        type="subtitle"
        style={[styles.subtitle, { color: subtitleColor }]}
      >
        Veja os comentários recentes de seus alunos.
      </ThemedText>

      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />

      <Link href="/adm_home" dismissTo style={homeLinkStyle}>
        <ThemedText
          type="defaultSemiBold"
          lightColor="#6b42c1"
          darkColor="#c4b5fd"
          style={styles.cardText}
        >
          Voltar para Home
        </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
