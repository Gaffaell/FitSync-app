import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router, useLocalSearchParams } from "expo-router";
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

export default function CadastroTreino() {
  const { exercicio_id, id, dia } = useLocalSearchParams();
  console.log(exercicio_id, id, dia);
  const [formData, setFormData] = useState({
    id_aluno: id.toString(),
    id_exercicio: exercicio_id.toString(),
    carga: "",
    series: "",
    repeticoes: "",
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
          Cadastrar treino
        </ThemedText>
        <ThemedText
          type="subtitle"
          lightColor="#4b6570"
          darkColor="#9ca3af"
          style={styles.subtitle}
        >
          Adicione um treino novo ao sistema e comece a personalizar os
          exercícios.
        </ThemedText>

        <ThemedView style={cardStyle}>
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            id_aluno
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={id.toString()}
            onChangeText={(text) => handleChange("id_aluno", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            id_exercicio
          </ThemedText>
          <TextInput
            style={inputStyle}
            value={exercicio_id.toString()}
            onChangeText={(text) => handleChange("id_exercicio", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Carga
          </ThemedText>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => handleChange("carga", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
            Séries
          </ThemedText>
          <TextInput
            style={inputStyle}
            onChangeText={(text) => handleChange("series", text)}
          />
          <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
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
        <Link href="/adm_home" dismissTo>
          <ThemedText type="defaultSemiBold" style={styles.cardText}>
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
  cardText: { fontSize: 16, textAlign: "center" },
});
