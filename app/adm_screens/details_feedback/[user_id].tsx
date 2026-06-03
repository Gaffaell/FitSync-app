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
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
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

  const { user_id, dia, data } = useLocalSearchParams();

  const [feedback, setFeedback] = useState<any>(null);
  const [treinosByDay, setTreinosByDay] = useState<any[]>([]);

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
  const infoLabelColor = useThemeColor(
    { light: "#64748b", dark: "#94a3b8" },
    "text",
  );

  const weekDays = [{ label: dia, color: accentColor, collection: dia }];

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText
            type="title"
            style={[styles.heroTitle, { color: "#fff" }]}
          >
            Informações do feedback
          </ThemedText>
          <ThemedText
            style={[styles.heroSubtitle, { color: "rgba(255,255,255,0.92)" }]}
          >
            Veja os detalhes do aluno e o treino previsto para o dia
            selecionado.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.card,
            { backgroundColor: cardBackground, borderColor: accentColor },
          ]}
        >
          <View style={styles.infoGroup}>
            <ThemedText style={[styles.infoLabel, { color: infoLabelColor }]}>
              Nome do aluno
            </ThemedText>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>
              {feedback[0].nome_aluno}
            </ThemedText>
          </View>
          <View style={styles.infoGroup}>
            <ThemedText style={[styles.infoLabel, { color: infoLabelColor }]}>
              Dia da semana
            </ThemedText>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>
              {feedback[0].dia_semana}
            </ThemedText>
          </View>
          <View style={styles.infoGroup}>
            <ThemedText style={[styles.infoLabel, { color: infoLabelColor }]}>
              Opção de feedback
            </ThemedText>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>
              {feedback[0].feedback_opcao}
            </ThemedText>
          </View>
          <View style={styles.infoGroup}>
            <ThemedText style={[styles.infoLabel, { color: infoLabelColor }]}>
              Feedback detalhado
            </ThemedText>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>
              {feedback[0].feedback_detalhado}
            </ThemedText>
          </View>
          <View style={styles.infoGroup}>
            <ThemedText style={[styles.infoLabel, { color: infoLabelColor }]}>
              Data do treino
            </ThemedText>
            <ThemedText style={[styles.infoValue, { color: textColor }]}>
              {feedback[0].data}
            </ThemedText>
          </View>
        </ThemedView>

        <View style={styles.treinoContainer}>
          <ThemedText
            type="title"
            style={[styles.sectionTitle, { color: textColor }]}
          >
            Treino
          </ThemedText>
          {treinosByDay.map((day) => (
            <ThemedView
              key={day.collection}
              style={[
                styles.dayBlock,
                { backgroundColor: cardBackground, borderColor: accentColor },
              ]}
            >
              <ThemedText
                type="defaultSemiBold"
                style={[styles.dayTitle, { color: day.color }]}
              >
                {day.label}
              </ThemedText>
              {day.items.length === 0 ? (
                <ThemedText
                  style={[styles.noTreinoText, { color: subtitleColor }]}
                >
                  Nenhum treino definido para este dia.
                </ThemedText>
              ) : (
                day.items.map((item: any) => (
                  <ThemedView
                    key={item.id}
                    style={[
                      styles.treinoItem,
                      { backgroundColor: pageBackground },
                    ]}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={[styles.treinoTitle, { color: textColor }]}
                    >
                      {item.exercicio?.nome ?? `Exercício ${item.id_exercicio}`}
                    </ThemedText>
                    <ThemedText
                      style={[styles.treinoText, { color: subtitleColor }]}
                    >
                      {item.exercicio?.descricao ?? ""}
                    </ThemedText>
                    <ThemedText
                      style={[styles.treinoText, { color: subtitleColor }]}
                    >
                      Séries: {item.series}
                    </ThemedText>
                    <ThemedText
                      style={[styles.treinoText, { color: subtitleColor }]}
                    >
                      Repetições: {item.repeticoes}
                    </ThemedText>
                    <ThemedText
                      style={[styles.treinoText, { color: subtitleColor }]}
                    >
                      Carga: {item.carga}
                    </ThemedText>
                  </ThemedView>
                ))
              )}
            </ThemedView>
          ))}
        </View>

        <Pressable
          onPress={deleteFeedback}
          style={[styles.deleteButton, { backgroundColor: "#f87171" }]}
        >
          <ThemedText type="defaultSemiBold" style={styles.deleteButtonText}>
            Excluir feedback
          </ThemedText>
        </Pressable>

        <Link href="/adm_home" dismissTo style={styles.linkButton}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.linkText, { color: accentColor }]}
          >
            Voltar para Home
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 24,
  },
  container: {
    flex: 1,
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
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  heroTitle: {
    fontSize: 28,
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  infoGroup: {
    width: "100%",
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  treinoContainer: {
    width: "100%",
    maxWidth: 520,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 16,
  },
  dayBlock: {
    width: "100%",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
  },
  dayTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  noTreinoText: {
    fontSize: 14,
    marginBottom: 10,
  },
  treinoItem: {
    width: "100%",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  treinoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  treinoText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  deleteButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
