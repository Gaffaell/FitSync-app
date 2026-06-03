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
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { initializeApp } from "firebase/app";

const weekDays = [
  { label: "Segunda-feira", color: "#0f4c81", collection: "segunda-feira" },
  { label: "Terça-feira", color: "#0a7ea4", collection: "terca-feira" },
  { label: "Quarta-feira", color: "#8b5cf6", collection: "quarta-feira" },
  { label: "Quinta-feira", color: "#fb923c", collection: "quinta-feira" },
  { label: "Sexta-feira", color: "#22c55e", collection: "sexta-feira" },
  { label: "Sábado", color: "#22c55e", collection: "sabado" },
  { label: "Domingo", color: "#22c55e", collection: "domingo" },
];

export default function InformacoesAluno() {
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

  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<any>(null);
  const [treinosByDay, setTreinosByDay] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUser() {
      if (typeof id !== "string") return;
      const docRef = doc(db, "aluno", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    }

    fetchUser();
  }, [id]);

  useEffect(() => {
    async function fetchTreinosByDay() {
      if (typeof id !== "string") return;

      const queryResults = await Promise.all(
        weekDays.map(async (day) => {
          const treinoSnapshot = await getDocs(
            query(collection(db, day.collection), where("id_aluno", "==", id)),
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
  }, [id]);

  if (!user) {
    return <ThemedText>Loading...</ThemedText>;
  }

  async function deleteUser(id: any) {
    try {
      if (typeof id !== "string") return;
      await deleteDoc(doc(db, "aluno", id));
      alert("Aluno excluído com sucesso!");
      router.push("/adm_screens/lista_alunos");
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTreino(treino_id: any, dia: string) {
    try {
      if (typeof treino_id !== "string") return;
      await deleteDoc(doc(db, dia, treino_id));
      alert("Treino excluído com sucesso!");
      router.push(`/adm_screens/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Informações de aluno
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Detalhes do aluno e seus treinos organizados por dia.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.card,
            {
              backgroundColor: cardBackground,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <View style={styles.infoContainer}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Nome:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.nome}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Idade:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.idade}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Email:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.email}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Senha:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.senha}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Altura:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.altura}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Peso:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.peso}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Sexo:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.sexo}
              </ThemedText>
            </ThemedText>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Telefone:{" "}
              <ThemedText style={[styles.value, { color: textColor }]}>
                {user.telefone}
              </ThemedText>
            </ThemedText>
          </View>
        </ThemedView>

        <View style={styles.treinoContainer}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Treinos
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
                    <Pressable
                      onPress={() => deleteTreino(item.id, day.collection)}
                      style={[
                        styles.smallButton,
                        { backgroundColor: buttonColor },
                      ]}
                    >
                      <ThemedText style={styles.smallButtonText}>
                        Excluir treino
                      </ThemedText>
                    </Pressable>
                  </ThemedView>
                ))
              )}
            </ThemedView>
          ))}
        </View>

        <Pressable
          style={[styles.actionButton, { backgroundColor: buttonColor }]}
          onPress={() => router.push(`/adm_screens/editar_informacoes/${id}`)}
        >
          <ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
            Editar informações
          </ThemedText>
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: accentColor }]}
          onPress={() => router.push(`/adm_screens/definir_treino/${id}`)}
        >
          <ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
            Definir treino
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={() => deleteUser(id)}
          style={[styles.deleteButton, { backgroundColor: "#f87171" }]}
        >
          <ThemedText type="defaultSemiBold" style={styles.actionButtonText}>
            Excluir aluno
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
  scrollView: {
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
  sectionTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  infoContainer: {
    width: "100%",
    gap: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "left",
  },
  value: {
    color: "#fff",
    fontWeight: "600",
  },
  treinoContainer: {
    width: "100%",
    marginBottom: 16,
  },
  dayBlock: {
    width: "100%",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
  },
  dayTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  noTreinoText: {
    fontSize: 14,
    marginBottom: 12,
  },
  treinoItem: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 12,
  },
  treinoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  treinoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  smallButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  actionButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    textAlign: "center",
  },
});
