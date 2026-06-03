import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

// Firebase
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

export default function CadastroTreino() {
  const { exercicio_id, id, dia } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    id_aluno: id?.toString() ?? "",
    id_exercicio: exercicio_id?.toString() ?? "",
    carga: "",
    series: "",
    repeticoes: "",
  });

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
  const inputBackground = useThemeColor(
    { light: "#F8FAFC", dark: "#1F2937" },
    "background",
  );
  const inputColor = useThemeColor(
    { light: "#0F172A", dark: "#F8FAFC" },
    "text",
  );

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, dia.toString()), formData);
      alert("Treino cadastrado com sucesso!");
      setFormData({
        id_aluno: id.toString(),
        id_exercicio: exercicio_id.toString(),
        carga: "",
        series: "",
        repeticoes: "",
      });
      router.push({
        pathname: "/adm_screens/definir_treino/definir_treino_dia/[id]",
        params: {
          dia: dia.toString(),
          id: id.toString(),
        },
      });
    } catch (error) {
      alert("Erro ao cadastrar treino. Tente novamente.");
    }
  };

  const cardStyle = StyleSheet.flatten([
    styles.card,
    { backgroundColor: cardBackground, borderColor: accentColor },
  ]);
  const inputStyle = StyleSheet.flatten([
    styles.input,
    {
      backgroundColor: inputBackground,
      color: inputColor,
      borderColor: accentColor,
    },
  ]);
  const primaryButtonStyle = StyleSheet.flatten([
    styles.button,
    styles.primaryButton,
    { backgroundColor: buttonColor },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={[styles.heading, { color: "#fff" }]}>
            Cadastrar treino
          </ThemedText>
          <ThemedText
            type="subtitle"
            style={[styles.subtitle, { color: "rgba(255,255,255,0.9)" }]}
          >
            Adicione um treino novo ao sistema e comece a personalizar os
            exercícios.
          </ThemedText>
        </ThemedView>

        <ThemedView style={cardStyle}>
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: subtitleColor }]}
          >
            ID do aluno
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={id?.toString() ?? ""}
            onChangeText={(text) => handleChange("id_aluno", text)}
          />
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: subtitleColor }]}
          >
            ID do exercício
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={exercicio_id?.toString() ?? ""}
            onChangeText={(text) => handleChange("id_exercicio", text)}
          />
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: subtitleColor }]}
          >
            Carga
          </ThemedText>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => handleChange("carga", text)}
          />
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: subtitleColor }]}
          >
            Séries
          </ThemedText>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => handleChange("series", text)}
          />
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: subtitleColor }]}
          >
            Repetições
          </ThemedText>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => handleChange("repeticoes", text)}
          />
        </ThemedView>

        <Pressable onPress={handleSubmit} style={primaryButtonStyle}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Cadastrar
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
  scrollContainer: { flexGrow: 1 },
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
    marginBottom: 20,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  heading: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 26,
    lineHeight: 24,
    maxWidth: 360,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  fieldLabel: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
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
  primaryButton: {
    backgroundColor: "#6b42c1",
  },
  buttonText: {
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
    textAlign: "center",
    marginTop: 12,
  },
  linkText: {
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
});
