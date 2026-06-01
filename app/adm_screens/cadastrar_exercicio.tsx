import { Link, router } from "expo-router";
import { Pressable, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiRZdjS62ZR3vjBIg4RJ5v0YyxxCWytkk",
  authDomain: "academia-projeto-f6edb.firebaseapp.com",
  projectId: "academia-projeto-f6edb",
  storageBucket: "academia-projeto-f6edb.appspot.com",
  messagingSenderId: "683804245498",
  appId: "1:683804245498:web:f9fd6dfdfbfbc720757843",
  measurementId: "G-0CLP55GERT",
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CadastrarExercicio() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "exercicios"), formData);
      alert("Exercício cadastrado com sucesso!");
      setFormData({
        nome: "",
        descricao: "",
      });
      router.push("/adm_home");
    } catch (error) {
      alert("Erro ao cadastrar exercício. Tente novamente.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titleContainer}>
        Cadastrar exercício
      </ThemedText>
      <ThemedView style={styles.card}>
        <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
          Nome
        </ThemedText>
        <TextInput
          style={styles.input}
          value={formData.nome}
          onChangeText={(text) => handleChange("nome", text)}
        />
        <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
          Descrição
        </ThemedText>
        <TextInput
          style={styles.input}
          value={formData.descricao}
          onChangeText={(text) => handleChange("descricao", text)}
        />
      </ThemedView>
      <Pressable onPress={handleSubmit} style={styles.button}>
        <ThemedText>Salvar</ThemedText>
      </Pressable>
      <Link href="/adm_home" dismissTo>
        <ThemedText type="defaultSemiBold" style={styles.cardText}>
          Voltar para Home
        </ThemedText>
      </Link>
    </ThemedView>
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
  fieldLabel: {
    marginBottom: 8,
    color: "#64748b",
    fontSize: 14,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
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
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  cardText: { fontSize: 16, textAlign: "center" },
});
