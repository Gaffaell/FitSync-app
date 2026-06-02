import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

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
  const inputBackground = useThemeColor(
    { light: "#F8FAFC", dark: "#111827" },
    "background",
  );
  const inputBorderColor = useThemeColor(
    { light: "#E0E7FF", dark: "#334155" },
    "tint",
  );

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Cadastrar exercício
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Insira os dados do novo exercício e deixe o sistema pronto para uso.
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
          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Nome
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                color: textColor,
                borderColor: inputBorderColor,
              },
            ]}
            value={formData.nome}
            onChangeText={(text) => handleChange("nome", text)}
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Descrição
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                color: textColor,
                borderColor: inputBorderColor,
              },
            ]}
            value={formData.descricao}
            onChangeText={(text) => handleChange("descricao", text)}
            multiline
            numberOfLines={4}
          />
        </ThemedView>

        <Pressable
          onPress={handleSubmit}
          style={[
            styles.button,
            { backgroundColor: buttonColor, shadowColor: buttonColor },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>
            Salvar
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
    justifyContent: "flex-start",
    alignItems: "center",
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
  fieldLabel: {
    marginBottom: 8,
    fontSize: 14,
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
  input: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    textAlign: "center",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
});
