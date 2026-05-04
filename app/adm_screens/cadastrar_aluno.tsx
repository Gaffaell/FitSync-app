import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";

// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiRZdjS62ZR3vjBIg4RJ5v0YyxxCWytkk",
  authDomain: "academia-projeto-f6edb.firebaseapp.com",
  projectId: "academia-projeto-f6edb",
  storageBucket: "academia-projeto-f6edb.appspot.com", // corrigido
  messagingSenderId: "683804245498",
  appId: "1:683804245498:web:f9fd6dfdfbfbc720757843",
  measurementId: "G-0CLP55GERT"
};

// Inicializa Firebase e Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function CadastroAluno() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    sexo: "",
    peso: "",
    telefone: "",
    altura: "",
    email: "",
    senha: ""
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Tentando salvar aluno:", formData);

      // salva na coleção correta (singular)
      await addDoc(collection(db, "aluno"), formData);

      alert("Aluno cadastrado com sucesso!");

      // limpa o formulário
      setFormData({
        nome: "",
        idade: "",
        sexo: "",
        peso: "",
        telefone: "",
        altura: "",
        email: "",
        senha: ""
      });

      // ⚠️ não tem mais navegação, você continua na tela de cadastro

    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CADASTRAR ALUNO</Text>

      <Text style={styles.label}>NOME</Text>
      <TextInput style={styles.input} value={formData.nome} onChangeText={(t) => handleChange("nome", t)} />

      <Text style={styles.label}>IDADE</Text>
      <TextInput style={styles.input} value={formData.idade} onChangeText={(t) => handleChange("idade", t)} keyboardType="numeric" />

      <Text style={styles.label}>SEXO</Text>
      <TextInput style={styles.input} value={formData.sexo} onChangeText={(t) => handleChange("sexo", t)} />

      <Text style={styles.label}>PESO</Text>
      <TextInput style={styles.input} value={formData.peso} onChangeText={(t) => handleChange("peso", t)} />

      <Text style={styles.label}>TELEFONE</Text>
      <TextInput style={styles.input} value={formData.telefone} onChangeText={(t) => handleChange("telefone", t)} keyboardType="phone-pad" />

      <Text style={styles.label}>ALTURA</Text>
      <TextInput style={styles.input} value={formData.altura} onChangeText={(t) => handleChange("altura", t)} />

      <Text style={styles.label}>E-MAIL</Text>
      <TextInput style={styles.input} value={formData.email} onChangeText={(t) => handleChange("email", t)} />

      <Text style={styles.label}>SENHA</Text>
      <TextInput style={styles.input} value={formData.senha} onChangeText={(t) => handleChange("senha", t)} secureTextEntry />

      <Link href="/adm_home" dismissTo style={styles.button}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/adm_home" dismissTo style={styles.link}>
        <ThemedText type="link">HOME</ThemedText>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#000", padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", color: "#a020f0", textAlign: "center", marginBottom: 20 },
  label: { color: "#fff", marginTop: 10, marginBottom: 5 },
  input: { backgroundColor: "#222", color: "#fff", padding: 10, borderRadius: 5, marginBottom: 10 },
  button: { backgroundColor: "#a020f0", padding: 15, textAlign: "center", borderRadius: 5, marginTop: 20 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  link: { marginTop: 15, paddingVertical: 15, textAlign: 'center' },
});
