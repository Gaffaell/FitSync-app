import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router, useLocalSearchParams } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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
  const { dia, id } = useLocalSearchParams();
  const [exercicios, setExercicios] = useState<any[]>([]);

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

  return (
    <ThemedView style={[styles.container, { backgroundColor: pageBackground }]}>
      <FlatList
        data={exercicios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <ThemedText
              type="title"
              style={[styles.headerTitle, { color: textColor }]}
            >
              Exercícios
            </ThemedText>
            <ThemedText
              type="subtitle"
              style={[styles.headerSubtitle, { color: subtitleColor }]}
            >
              Selecione um exercício para definir no dia.
            </ThemedText>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Link href="/adm_home" asChild>
              <Pressable
                style={StyleSheet.flatten([
                  styles.saveButton,
                  { backgroundColor: buttonColor, shadowColor: buttonColor },
                ])}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.saveButtonText}
                >
                  Salvar
                </ThemedText>
              </Pressable>
            </Link>

            <Link href="/adm_home" dismissTo style={styles.linkButton}>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.linkText, { color: accentColor }]}
              >
                Voltar para Home
              </ThemedText>
            </Link>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={StyleSheet.flatten([
              styles.item,
              {
                backgroundColor: cardBackground,
                borderColor: accentColor,
                shadowColor: accentColor,
              },
            ])}
            onPress={() =>
              router.push({
                pathname:
                  "/adm_screens/definir_treino/definir_treino_dia/definir_exercicio/definicao/[exercicio_id]",
                params: {
                  exercicio_id: item.id.toString(),
                  id: id?.toString(),
                  dia: dia?.toString(),
                },
              })
            }
          >
            <ThemedText
              type="defaultSemiBold"
              style={[styles.itemTitle, { color: textColor }]}
            >
              {item.nome}
            </ThemedText>
            <ThemedText style={[styles.itemSubtitle, { color: subtitleColor }]}>
              {item.descricao}
            </ThemedText>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <ThemedText style={[styles.emptyText, { color: subtitleColor }]}>
            Nenhum exercício encontrado.
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
  },
  header: {
    width: "100%",
    maxWidth: 520,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    marginBottom: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  list: {
    width: "100%",
    maxWidth: 520,
    paddingBottom: 28,
  },
  item: {
    width: "100%",
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    width: "100%",
    gap: 12,
    marginTop: 12,
    alignItems: "center",
  },
  saveButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  linkButton: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center",
  },
});
