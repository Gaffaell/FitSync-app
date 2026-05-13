import { Link, router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";

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

  async function updateUser(id: any) {
    try {
      if (typeof id !== "string") return;
      const userRef = doc(db, "aluno", id);
      console.log(user);
      console.log(typeof user.nome);
      await updateDoc(userRef, {
        nome: user.nome,
        idade: user.idade,
        email: user.email,
        senha: user.senha,
        altura: user.altura,
        peso: user.peso,
        sexo: user.sexo,
        telefone: user.telefone,
      });
      alert("Aluno atualizado com sucesso!");
      router.push(`/adm_screens/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleContainer}>
          Editar informações de aluno
        </ThemedText>

        <ThemedText>Nome: </ThemedText>
        <input
          type="text"
          placeholder="Novo nome"
          value={user.nome}
          onChange={(e) => setUser({ ...user, nome: e.target.value })}
        />
        <ThemedText>Idade: </ThemedText>
        <input
          type="text"
          placeholder="Nova idade"
          value={user.idade}
          onChange={(e) => setUser({ ...user, idade: e.target.value })}
        />
        <ThemedText>Email: </ThemedText>
        <input
          type="text"
          placeholder="Novo email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <ThemedText>Senha: </ThemedText>
        <input
          type="text"
          placeholder="Nova senha"
          value={user.senha}
          onChange={(e) => setUser({ ...user, senha: e.target.value })}
        />
        <ThemedText>Altura: </ThemedText>
        <input
          type="text"
          placeholder="Nova altura"
          value={user.altura}
          onChange={(e) => setUser({ ...user, altura: e.target.value })}
        />
        <ThemedText>Peso: </ThemedText>
        <input
          type="text"
          placeholder="Novo peso"
          value={user.peso}
          onChange={(e) => setUser({ ...user, peso: e.target.value })}
        />
        <ThemedText>Sexo: </ThemedText>
        <input
          type="text"
          placeholder="Novo sexo"
          value={user.sexo}
          onChange={(e) => setUser({ ...user, sexo: e.target.value })}
        />
        <ThemedText>Telefone: </ThemedText>
        <input
          type="text"
          placeholder="Novo telefone"
          value={user.telefone}
          onChange={(e) => setUser({ ...user, telefone: e.target.value })}
        />

        <TouchableOpacity onPress={() => updateUser(id)}>
          <ThemedText style={styles.button}>Salvar informações</ThemedText>
        </TouchableOpacity>
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
