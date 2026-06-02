import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

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

export default function CadastroAluno() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    sexo: "",
    peso: "",
    telefone: "",
    altura: "",
    email: "",
    senha: "",
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
      await addDoc(collection(db, "aluno"), formData);
      alert("Aluno cadastrado com sucesso!");
      setFormData({
        nome: "",
        idade: "",
        sexo: "",
        peso: "",
        telefone: "",
        altura: "",
        email: "",
        senha: "",
      });
      router.push("/adm_home");
    } catch (error) {
      alert("Erro ao cadastrar aluno. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Cadastrar aluno
          </ThemedText>
          <ThemedText
            style={[styles.heroSubtitle, { color: "rgba(255,255,255,0.92)" }]}
          >
            Adicione um aluno novo ao sistema e comece a personalizar os
            treinos.
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
            Idade
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
            value={formData.idade}
            onChangeText={(text) => handleChange("idade", text)}
            keyboardType="numeric"
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Sexo
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
            value={formData.sexo}
            onChangeText={(text) => handleChange("sexo", text)}
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Peso
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
            value={formData.peso}
            onChangeText={(text) => handleChange("peso", text)}
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Telefone
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
            value={formData.telefone}
            onChangeText={(text) => handleChange("telefone", text)}
            keyboardType="phone-pad"
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Altura
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
            value={formData.altura}
            onChangeText={(text) => handleChange("altura", text)}
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            E-mail
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
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <ThemedText
            type="defaultSemiBold"
            style={[styles.fieldLabel, { color: textColor }]}
          >
            Senha
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
            value={formData.senha}
            onChangeText={(text) => handleChange("senha", text)}
            secureTextEntry
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
  scrollContainer: {
    flexGrow: 1,
  },
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
  heading: {
    marginTop: 56,
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
    borderRadius: 20,
    padding: 20,
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
});
