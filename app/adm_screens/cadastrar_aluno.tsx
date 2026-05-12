import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";

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
  const theme = useColorScheme();
  const inputBackground = theme === "dark" ? "#1f2937" : "#f8fafc";
  const inputColor = theme === "dark" ? "#f8fafc" : "#0f172a";
  const cardBackground = theme === "dark" ? "#111827" : "#ffffff";
  const shadowColor = theme === "dark" ? "#000" : "#0a7ea4";

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
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
      alert("Erro ao cadastrar aluno. Tente novamente.");
    }
  };

  const cardStyle = {
    ...styles.card,
    backgroundColor: cardBackground,
    shadowColor,
  };
  const inputStyle = {
    ...styles.input,
    backgroundColor: inputBackground,
    color: inputColor,
  };
  const primaryButtonStyle = {
    ...styles.button,
    ...styles.primaryButton,
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView
        style={styles.container}
        lightColor="#edf6ff"
        darkColor="#071014"
      >
        <ThemedText type="title" style={styles.heading}>
          Cadastrar aluno
        </ThemedText>
        <ThemedText
          type="subtitle"
          lightColor="#4b6570"
          darkColor="#9ca3af"
          style={styles.subtitle}
        >
          Adicione um aluno novo ao sistema e comece a personalizar os treinos.
        </ThemedText>

        <ThemedView style={cardStyle}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Nome
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.nome}
            onChangeText={(text) => handleChange("nome", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Idade
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.idade}
            onChangeText={(text) => handleChange("idade", text)}
            keyboardType="numeric"
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Sexo
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.sexo}
            onChangeText={(text) => handleChange("sexo", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Peso
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.peso}
            onChangeText={(text) => handleChange("peso", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Telefone
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.telefone}
            onChangeText={(text) => handleChange("telefone", text)}
            keyboardType="phone-pad"
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Altura
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.altura}
            onChangeText={(text) => handleChange("altura", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            E-mail
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Senha
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={formData.senha}
            onChangeText={(text) => handleChange("senha", text)}
            secureTextEntry
          />
        </ThemedView>

        <Link href="/adm_home" asChild>
          <Pressable onPress={handleSubmit} style={primaryButtonStyle}>
            <ThemedText type="defaultSemiBold" style={styles.buttonText}>
              Cadastrar
            </ThemedText>
          </Pressable>
        </Link>
        <Link href="/adm_home" dismissTo>
          <ThemedText type="link" style={styles.link}>
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
  input: {
    width: "100%",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: "#6b42c1",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    marginTop: 12,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#6b42c1",
  },
});
