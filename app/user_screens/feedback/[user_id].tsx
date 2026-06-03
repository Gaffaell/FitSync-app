import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
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
  const accentColor = useThemeColor({}, "accent");
  const tintColor = useThemeColor({}, "text");
  const buttonColor = useThemeColor({}, "button");
  const surfaceColor = useThemeColor(
    { light: "#F8FAFC", dark: "#111827" },
    "background",
  );
  const inputBackground = useThemeColor(
    { light: "#F8FAFC", dark: "#111827" },
    "background",
  );

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Hora do feedback
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Conte como foi o treino e ajude seu professor a aperfeiçoar cada
            sessão.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.card,
            { backgroundColor: surfaceColor, borderColor: accentColor },
          ]}
        >
          <ThemedText type="title" style={styles.cardTitle}>
            Cadastrar feedback
          </ThemedText>

          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Seu nome
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: tintColor,
              },
            ]}
            placeholder="Digite seu nome"
            placeholderTextColor="#94A3B8"
            value={formData.nome_aluno}
            onChangeText={(text) => handleChange("nome_aluno", text)}
          />

          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            ID do aluno
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: tintColor,
              },
            ]}
            value={formData.id_aluno}
            editable={false}
          />

          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Dia da semana
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: tintColor,
              },
            ]}
            value={formData.dia_semana}
            editable={false}
          />

          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Feedback rápido
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: tintColor,
              },
            ]}
            placeholder="Ex: Muito difícil, Perfeito, Ajustar carga"
            placeholderTextColor="#94A3B8"
            value={formData.feedback_opcao}
            onChangeText={(text) => handleChange("feedback_opcao", text)}
          />

          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Feedback detalhado
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: tintColor,
              },
            ]}
            placeholder="Conte como foi a experiência do treino"
            placeholderTextColor="#94A3B8"
            value={formData.feedback_detalhado}
            onChangeText={(text) => handleChange("feedback_detalhado", text)}
            multiline
            numberOfLines={4}
          />
        </ThemedView>

        <Pressable
          onPress={handleSubmit}
          style={[styles.button, { backgroundColor: buttonColor }]}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Salvar feedback
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/user_home",
              params: {
                user_id: user_id?.toString() ?? "",
              },
            })
          }
        >
          <ThemedText type="defaultSemiBold" style={styles.cardText}>
            Voltar para Home
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 12,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  heroTitle: {
    color: "#FFFFFF",
    marginBottom: 10,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.88)",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 22,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#8B5CF6",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 16,
    color: "#0F172A",
  },
  fieldLabel: {
    marginBottom: 8,
    color: "#64748B",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    fontSize: 15,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
  },
});
