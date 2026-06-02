import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

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

  const accentColor = useThemeColor({}, "accent");
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const cardBackground = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const textColor = useThemeColor({}, "text");
  const itemStyle = {
    ...styles.item,
    backgroundColor: cardBackground,
    borderColor: accentColor,
    shadowColor: accentColor,
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: pageBackground }]}>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
              <ThemedText type="title" style={styles.heroTitle}>
                Lista de alunos
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                Visualize os alunos cadastrados e toque para ver seus dados.
              </ThemedText>
            </ThemedView>
          </>
        }
        ListFooterComponent={
          <Link href="/adm_home" dismissTo style={styles.linkButton}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.linkText, { color: accentColor }]}
            >
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
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
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
  title: {
    marginTop: 0,
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 22,
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
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  nome: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
  email: { fontSize: 14, color: "#94a3b8" },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    textAlign: "center",
  },
  cardText: { fontSize: 16, textAlign: "center" },
});
