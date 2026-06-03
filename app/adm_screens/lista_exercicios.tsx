import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

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
  const itemStyle = {
    ...styles.item,
    backgroundColor: cardBackground,
    borderColor: accentColor,
    shadowColor: accentColor,
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: pageBackground }]}>
      <FlatList
        data={exercicios}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
              <ThemedText type="title" style={styles.heroTitle}>
                Exercícios
              </ThemedText>
              <ThemedText style={styles.heroSubtitle}>
                Liste e gerencie os exercícios disponíveis com um visual mais
                claro.
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
            onPress={() =>
              router.push(`/adm_screens/editar_exercicio/${item.id}`)
            }
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.title, { color: textColor }]}
            >
              Nome: {item.nome}
            </ThemedText>
            <ThemedText style={[styles.cardText, { color: subtitleColor }]}>
              Descrição: {item.descricao}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
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
    marginTop: 0,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: 360,
    textAlign: "center",
  },
  flatList: {
    width: "100%",
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
  linkButton: {
    width: "100%",
    maxWidth: 520,
    marginTop: 12,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    textAlign: "center",
  },
});
