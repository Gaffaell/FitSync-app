import { Link, router, useLocalSearchParams } from "expo-router";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAiRZdjS62ZR3vjBIg4RJ5v0YyxxCWytkk",
  authDomain: "academia-projeto-f6edb.firebaseapp.com",
  projectId: "academia-projeto-f6edb",
  storageBucket: "academia-projeto-f6edb.appspot.com",
  messagingSenderId: "683804245498",
  appId: "1:683804245498:web:f9fd6dfdfbfbc720757843",
  measurementId: "G-0CLP55GERT",
};

export default function InformacoesAluno() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const { user_id, dia, feedback_opcao, feedback_detalhado, data } =
    useLocalSearchParams();

  const [feedback, setFeedback] = useState<any>(null);
  const [treinosByDay, setTreinosByDay] = useState<any[]>([]);

  const weekDays = [{ label: dia, color: "#0f4c81", collection: dia }];

  useEffect(() => {
    async function fetchFeedback() {
      if (typeof user_id !== "string") return;
      const feedbackQuery = query(
        collection(db, "feedbacks"),
        where("id_aluno", "==", user_id),
        where("dia_semana", "==", dia),
        where("data", "==", data),
      );
      const docSnap = await getDocs(feedbackQuery);
      const lista: any[] = [];
      docSnap.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setFeedback(lista);
    }

    fetchFeedback();
  }, [user_id]);

  useEffect(() => {
    async function fetchTreinosByDay() {
      if (typeof user_id !== "string") return;

      const queryResults = await Promise.all(
        weekDays.map(async (day) => {
          const treinoSnapshot = await getDocs(
            query(
              collection(db, day.collection),
              where("id_aluno", "==", user_id),
            ),
          );

          return treinoSnapshot.docs.map((docItem) => ({
            id: docItem.id,
            dayLabel: day.label,
            dayCollection: day.collection,
            dayColor: day.color,
            ...docItem.data(),
          }));
        }),
      );

      const allTreinoItems = queryResults.flat() as any[];
      const exercicioIds = Array.from(
        new Set(
          allTreinoItems.map((item) => item.id_exercicio).filter(Boolean),
        ),
      );

      const exercicioDocs = await Promise.all(
        exercicioIds.map((exId) => getDoc(doc(db, "exercicios", exId))),
      );

      const exercicioMap = new Map<string, any>();
      exercicioDocs.forEach((snap, index) => {
        if (snap.exists()) {
          exercicioMap.set(exercicioIds[index], snap.data());
        }
      });

      const grouped = weekDays.map((day) => ({
        label: day.label,
        collection: day.collection,
        color: day.color,
        items:
          queryResults
            .find((items) => items[0]?.dayCollection === day.collection)
            ?.map((item: any) => ({
              ...item,
              exercicio: exercicioMap.get(item.id_exercicio) ?? null,
            })) || [],
      }));

      setTreinosByDay(grouped);
    }

    fetchTreinosByDay();
  }, [user_id]);

  if (!feedback) {
    return <ThemedText>Loading...</ThemedText>;
  }

  async function deleteFeedback() {
    try {
      const feedbackQuery = query(
        collection(db, "feedbacks"),
        where("id_aluno", "==", user_id),
        where("dia_semana", "==", dia),
        where("data", "==", data),
      );
      const docSnap = await getDocs(feedbackQuery);
      await deleteDoc(doc(db, "feedbacks", docSnap.docs[0].id));
      alert("Feedback excluído com sucesso!");
      router.push("/adm_screens/lista_feedbacks");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleContainer}>
          Informações do feedback
        </ThemedText>

        <ThemedText>Nome do aluno: {feedback[0].nome_aluno}</ThemedText>
        <ThemedText>Dia da semana: {feedback[0].dia_semana}</ThemedText>
        <ThemedText>Feedback opção: {feedback[0].feedback_opcao}</ThemedText>
        <ThemedText>
          Feedback detalhado: {feedback[0].feedback_detalhado}
        </ThemedText>
        <ThemedText>Data do treino: {feedback[0].data}</ThemedText>
        <ThemedText>Id do aluno: {feedback[0].id_aluno}</ThemedText>

        <ScrollView style={styles.treinoContainer}>
          <ThemedText type="title" style={styles.titleContainer}>
            Treino
          </ThemedText>
          {treinosByDay.map((day) => (
            <ThemedView key={day.collection} style={styles.dayBlock}>
              <ThemedText
                type="defaultSemiBold"
                style={[styles.dayTitle, { color: day.color }]}
              >
                {day.label}
              </ThemedText>
              {day.items.length === 0 ? (
                <ThemedText style={styles.noTreinoText}>
                  Nenhum treino definido para este dia.
                </ThemedText>
              ) : (
                day.items.map((item: any) => (
                  <ThemedView key={item.id} style={styles.treinoItem}>
                    <ThemedText type="defaultSemiBold">
                      {item.exercicio?.nome ?? `Exercício ${item.id_exercicio}`}
                    </ThemedText>
                    <ThemedText>{item.exercicio?.descricao ?? ""}</ThemedText>
                    <ThemedText>Séries: {item.series}</ThemedText>
                    <ThemedText>Repetições: {item.repeticoes}</ThemedText>
                    <ThemedText>Carga: {item.carga}</ThemedText>
                  </ThemedView>
                ))
              )}
            </ThemedView>
          ))}
        </ScrollView>

        <Pressable onPress={() => deleteFeedback()} style={styles.button_2}>
          <ThemedText style={{ color: "black" }}>Excluir feedback</ThemedText>
        </Pressable>
        <Link href="/adm_home" dismissTo style={styles.link}>
          <ThemedText type="link">HOME</ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  treinoContainer: {
    width: "100%",
    marginBottom: 16,
  },
  dayBlock: {
    width: "100%",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dayTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  noTreinoText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  treinoItem: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginBottom: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button_2: {
    backgroundColor: "yellow",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button_3: {
    backgroundColor: "red",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
