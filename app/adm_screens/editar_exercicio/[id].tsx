import { Link, router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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
import { getFirestore } from "firebase/firestore";

export default function InformacoesExercicio() {
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

  const [exercicio, setExercicio] = useState<any>(null);

  useEffect(() => {
    async function fetchExercicio() {
      if (typeof id !== "string") return;
      const docRef = doc(db, "exercicios", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExercicio(docSnap.data());
      }
    }

    fetchExercicio();
  }, [id]);

  if (!exercicio) {
    return <ThemedText>Loading...</ThemedText>;
  }

  async function updateExercicio(id: any) {
    try {
      if (typeof id !== "string") return;
      const exercicioRef = doc(db, "exercicios", id);
      await updateDoc(exercicioRef, {
        nome: exercicio.nome,
        descricao: exercicio.descricao,
      });
      alert("Exercício atualizado com sucesso!");
      router.push(`/adm_screens/lista_exercicios`);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteExercicio(id: any) {
    try {
      if (typeof id !== "string") return;
      await deleteDoc(doc(db, "exercicios", id));
      alert("Exercício excluído com sucesso!");
      router.push("/adm_screens/lista_exercicios");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleContainer}>
          Editar informações de exercício
        </ThemedText>

        <ThemedText>Nome: </ThemedText>
        <input
          type="text"
          placeholder="Novo nome"
          value={exercicio.nome}
          onChange={(e) => setExercicio({ ...exercicio, nome: e.target.value })}
        />
        <ThemedText>Descrição: </ThemedText>
        <input
          type="text"
          placeholder="Nova descrição"
          value={exercicio.descricao}
          onChange={(e) =>
            setExercicio({ ...exercicio, descricao: e.target.value })
          }
        />

        <TouchableOpacity onPress={() => updateExercicio(id)}>
          <ThemedText style={styles.button}>Salvar informações</ThemedText>
        </TouchableOpacity>

        <Pressable onPress={() => deleteExercicio(id)} style={styles.button_2}>
          <ThemedText style={{ color: "black" }}>Excluir exercício</ThemedText>
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
