import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyAiRZdjS62ZR3vjBIg4RJ5v0YyxxCWytkk",
  authDomain: "academia-projeto-f6edb.firebaseapp.com",
  projectId: "academia-projeto-f6edb",
  storageBucket: "academia-projeto-f6edb.appspot.com",
  messagingSenderId: "683804245498",
  appId: "1:683804245498:web:f9fd6dfdfbfbc720757843",
  measurementId: "G-0CLP55GERT",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ListaExercicios() {
  const [exercicios, setExercicios] = useState<any[]>([]);

  const fetchExercicios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "exercicios"));
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setExercicios(lista);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);
  const theme = useColorScheme();
  const containerBg = theme === "dark" ? "#071014" : "#edf6ff";
  const cardBg = theme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";

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
          data={exercicios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              key={item.id}
              onPress={() =>
                router.push(`/adm_screens/editar_exercicio/${item.id}`)
              }
            >
              <ThemedText type="defaultSemiBold" style={styles.title}>
                {item.nome}
              </ThemedText>
              <ThemedText style={styles.cardText}>{item.descricao}</ThemedText>
            </TouchableOpacity>
          )}
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
    backgroundColor: "#2c1849",
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
  input: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
