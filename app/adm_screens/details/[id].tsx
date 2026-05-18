import { Link, router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
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
