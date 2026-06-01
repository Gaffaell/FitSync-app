import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
} from "react-native";

// Firebase
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

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

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState<any[]>([]);

  const fetchAlunos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "aluno"));
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setAlunos(lista);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const theme = useColorScheme();
  const containerBackground = theme === "dark" ? "#071014" : "#edf6ff";
  const itemBackground = theme === "dark" ? "#111827" : "#ffffff";
  const itemShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";
  const itemStyle = {
    ...styles.item,
    backgroundColor: itemBackground,
    shadowColor: itemShadow,
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: containerBackground }]}
    >
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <ThemedText
              type="title"
              style={[styles.title, { color: titleColor }]}
            >
              Lista de Alunos
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={[styles.subtitle, { color: subtitleColor }]}
            >
              Visualize e selecione um aluno para ver detalhes.
            </ThemedText>
          </>
        }
        ListFooterComponent={
          <Link href="/adm_home" dismissTo>
            <ThemedText type="defaultSemiBold" style={styles.cardText}>
              Voltar para Home
            </ThemedText>
          </Link>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={itemStyle}
            onPress={() => router.push(`/adm_screens/details/${item.id}`)}
          >
            <ThemedText type="defaultSemiBold" style={styles.nome}>
              {item.nome}
            </ThemedText>
            <ThemedText style={styles.email}>{item.email}</ThemedText>
          </TouchableOpacity>
        )}
      />
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
  title: { marginTop: 56, marginBottom: 6, textAlign: "center" },
  subtitle: {
    marginBottom: 24,
    lineHeight: 22,
    maxWidth: 360,
    textAlign: "center",
  },
  list: { width: "100%", paddingBottom: 20 },
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
  nome: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  email: { fontSize: 14, color: "#94a3b8" },
  cardText: { fontSize: 16, textAlign: "center" },
});
