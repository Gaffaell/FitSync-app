import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useState } from "react";

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

export default function Feedback() {
  const { dia, user_id } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    nome_aluno: "",
    id_aluno: user_id ? user_id.toString() : "",
    dia_semana: dia ? dia.toString() : "",
    feedback_detalhado: "",
    feedback_opcao: "",
    data: new Date().toLocaleDateString("en-GB"),
  });
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "feedbacks"), formData);
      alert("Feedback cadastrado com sucesso!");
      setFormData({
        nome_aluno: "",
        id_aluno: user_id ? user_id.toString() : "",
        dia_semana: dia ? dia.toString() : "",
        feedback_detalhado: "",
        feedback_opcao: "",
        data: new Date().toLocaleDateString("en-GB"),
      });
      router.push({ pathname: "/user_home", params: { user_id: user_id } });
    } catch (error) {
      alert("Erro ao cadastrar feedback. Tente novamente.");
    }
  };
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Hora do feedback</ThemedText>
        <ThemedText type="title" style={styles.titleContainer}>
          Cadastrar feedback
        </ThemedText>
        <ThemedView style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Seu nome
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.nome_aluno}
            onChangeText={(text) => handleChange("nome_aluno", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            id_aluno
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.id_aluno}
            onChangeText={(text) => handleChange("id_aluno", text)}
            editable={false}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Dia da semana
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.dia_semana}
            onChangeText={(text) => handleChange("dia_semana", text)}
            editable={false}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Feedback opção (Ex: "Muito difícil", "Muito fácil", "Perfeito",
            etc.)
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.feedback_opcao}
            onChangeText={(text) => handleChange("feedback_opcao", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Feedback detalhado (Conte como foi a experiência do treino, o que
            gostou, o que não gostou, sugestões, etc.)
          </ThemedText>
          <TextInput
            style={styles.input}
            value={formData.feedback_detalhado}
            onChangeText={(text) => handleChange("feedback_detalhado", text)}
          />
        </ThemedView>
        <Pressable onPress={handleSubmit} style={styles.button}>
          <ThemedText>Salvar</ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  fieldLabel: {
    marginBottom: 8,
    color: "#64748b",
    fontSize: 14,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  input: {
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
