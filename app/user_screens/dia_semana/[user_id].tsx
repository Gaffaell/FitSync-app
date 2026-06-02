import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

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

export default function ExerciciosDia() {
  const { dia, user_id } = useLocalSearchParams();
  const accentColor = useThemeColor({}, "accent");
  const buttonColor = useThemeColor({}, "button");
  const cardColor = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const pageBackground = useThemeColor(
    { light: "#F3F4F6", dark: "#0F172A" },
    "background",
  );
  const textColor = useThemeColor(
    { light: "#111827", dark: "#F8FAFC" },
    "text",
  );

  const [treino, setTreino] = useState<any[]>([]);
  const [exercicio, setExercicio] = useState<any>(null);

  useEffect(() => {
    async function getTreino() {
      if (typeof user_id !== "string") return;
      if (typeof dia !== "string") return;

      // 1) Fetch treino documents for the given day and aluno
      const treinoQuery = query(
        collection(db, dia),
        where("id_aluno", "==", user_id),
      );
      const docSnap = await getDocs(treinoQuery);
      const treinoData: any[] = docSnap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      if (treinoData.length === 0) {
        setTreino([]);
        return;
      }

      // 2) Fetch all unique exercicio documents referenced by the treino
      const exercicioIds = Array.from(
        new Set(treinoData.map((t) => t.id_exercicio)),
      );
      const exercicioSnaps = await Promise.all(
        exercicioIds.map((exId) => getDoc(doc(db, "exercicios", exId))),
      );

      const exercicioMap = new Map<string, any>();
      exercicioSnaps.forEach((snap, idx) => {
        if (snap && snap.exists()) {
          exercicioMap.set(exercicioIds[idx], snap.data());
        }
      });

      // 3) Merge exercise data into each treino item for rendering
      const treinoEnriched = treinoData.map((t) => {
        const ex = exercicioMap.get(t.id_exercicio) ?? null;
        return {
          ...t,
          exercicio: ex,
          nome: ex?.nome ?? null,
          descricao: ex?.descricao ?? null,
        };
      });

      setTreino(treinoEnriched);
    }

    getTreino();
  }, [dia, user_id]);

  return (
    <ThemedView style={[styles.container, { backgroundColor: pageBackground }]}>
      <FlatList
        data={treino}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
            <ThemedText type="title" style={styles.heroTitle}>
              Exercícios do dia
            </ThemedText>
            <ThemedText style={styles.heroSubtitle}>
              Veja seu treino de hoje e envie um feedback direto para o
              professor.
            </ThemedText>
          </ThemedView>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable
              style={[styles.feedbackButton, { backgroundColor: buttonColor }]}
              onPress={() =>
                router.push({
                  pathname: "/user_screens/feedback/[user_id]",
                  params: {
                    user_id: user_id?.toString() ?? "",
                    dia: dia,
                  },
                })
              }
            >
              <ThemedText
                type="defaultSemiBold"
                style={styles.feedbackButtonText}
              >
                Envie sua experiência do treino
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/user_home",
                  params: {
                    user_id: user_id?.toString() ?? "",
                  },
                })
              }
            >
              <ThemedText
                type="defaultSemiBold"
                style={[styles.cardText, { color: accentColor }]}
              >
                Voltar para Home
              </ThemedText>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <ThemedView style={[styles.item, { backgroundColor: cardColor }]}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.itemTitle, { color: textColor }]}
            >
              Nome: {item.nome}
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
              Descrição: {item.descricao}
            </ThemedText>
            <View style={styles.statsRow}>
              <ThemedText type="default">Séries: {item.series}</ThemedText>
              <ThemedText type="default">
                Repetições: {item.repeticoes}
              </ThemedText>
            </View>
            <ThemedText type="default">Carga: {item.carga}</ThemedText>
            <ThemedText type="default" style={styles.exerciseId}>
              ID do Exercício: {item.id_exercicio}
            </ThemedText>
          </ThemedView>
        )}
        ListEmptyComponent={
          <ThemedText type="default" style={styles.emptyText}>
            Nenhum exercício encontrado para este dia.
          </ThemedText>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatListContent: {
    alignItems: "center",
    paddingBottom: 30,
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 5,
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
    marginBottom: 24,
    textAlign: "center",
    color: "#0F172A",
  },
  footer: {
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    marginTop: 12,
    color: "#64748B",
    textAlign: "center",
  },
  item: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 5,
  },
  itemTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  itemSubtitle: {
    fontSize: 15,
    marginBottom: 12,
    color: "#6B7280",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  exerciseId: {
    color: "#64748B",
    marginTop: 10,
  },
  feedbackButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  feedbackButtonText: {
    color: "#111827",
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
});
