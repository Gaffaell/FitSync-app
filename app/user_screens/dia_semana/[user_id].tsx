import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
    <ThemedView style={styles.container}>
      <FlatList
        data={treino}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={
          <ThemedText type="title" style={styles.title}>
            Exercicios do dia
          </ThemedText>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Pressable
              style={styles.button_2}
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
              <ThemedText style={{ color: "black" }}>
                Envie a sua experiência do treino para o professor!
              </ThemedText>
            </Pressable>

            <Link href="/adm_home" dismissTo>
              <ThemedText type="defaultSemiBold" style={styles.cardText}>
                Voltar para Home
              </ThemedText>
            </Link>
          </View>
        }
        renderItem={({ item }) => (
          <ThemedView style={styles.item}>
            <ThemedText type="defaultSemiBold">{item.nome}</ThemedText>
            <ThemedText type="defaultSemiBold">{item.descricao}</ThemedText>
            <ThemedText type="default">Séries: {item.series}</ThemedText>
            <ThemedText type="default">
              Repetições: {item.repeticoes}
            </ThemedText>
            <ThemedText type="default">Carga: {item.carga}</ThemedText>
            <ThemedText type="default">
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
    paddingBottom: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    maxWidth: 520,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    marginTop: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
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
  button_2: {
    backgroundColor: "yellow",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
});
