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
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleContainer}>
          Informações de aluno
        </ThemedText>

        <ThemedText>Nome: {user.nome}</ThemedText>
        <ThemedText>Idade: {user.idade}</ThemedText>
        <ThemedText>Email: {user.email}</ThemedText>
        <ThemedText>Senha: {user.senha}</ThemedText>
        <ThemedText>Altura: {user.altura}</ThemedText>
        <ThemedText>Peso: {user.peso}</ThemedText>
        <ThemedText>Sexo: {user.sexo}</ThemedText>
        <ThemedText>Telefone: {user.telefone}</ThemedText>

        <ScrollView style={styles.treinoContainer}>
          <ThemedText type="title" style={styles.titleContainer}>
            Treinos
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
                    <Pressable
                      onPress={() => deleteTreino(item.id, day.collection)}
                      style={styles.button_2}
                    >
                      <ThemedText style={{ color: "black" }}>
                        Excluir treino
                      </ThemedText>
                    </Pressable>
                  </ThemedView>
                ))
              )}
            </ThemedView>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => router.push(`/adm_screens/editar_informacoes/${id}`)}
        >
          <ThemedText style={styles.button}>Editar informações</ThemedText>
        </TouchableOpacity>
        <Pressable
          style={styles.button_3}
          onPress={() => router.push(`/adm_screens/definir_treino/${id}`)}
        >
          <ThemedText>Definir treino</ThemedText>
        </Pressable>
        <Pressable onPress={() => deleteUser(id)} style={styles.button_2}>
          <ThemedText style={{ color: "black" }}>Excluir aluno</ThemedText>
        </Pressable>
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
  cardText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
});
