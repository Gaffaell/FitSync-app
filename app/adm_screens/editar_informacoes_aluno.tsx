import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, TextInput, useColorScheme, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

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

export default function EditarInformacoesAluno() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState<any>(null);

  const theme = useColorScheme();
  const inputBackground = theme === "dark" ? "#1f2937" : "#f8fafc";
  const inputColor = theme === "dark" ? "#f8fafc" : "#0f172a";
  const cardBackground = theme === "dark" ? "#111827" : "#ffffff";

  useEffect(() => {
    async function fetchAluno() {
      if (typeof id !== "string") return;
      try {
        const ref = doc(db, "aluno", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setFormData(snap.data());
        } else {
          Alert.alert("Erro", "Aluno não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    }
    fetchAluno();
  }, [id]);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (typeof id !== "string" || !formData) return;
      const alunoRef = doc(db, "aluno", id);
      await updateDoc(alunoRef, formData);
      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  if (!formData) {
    return <ThemedText>Carregando dados do aluno...</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.heading}>
          Editar informações de aluno
        </ThemedText>

        <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
          {Object.keys(formData).map((field) => (
            <React.Fragment key={field}>
              <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: inputBackground, color: inputColor }]}
                value={formData[field]}
                onChangeText={(text) => handleChange(field, text)}
                secureTextEntry={field === "senha"}
              />
            </React.Fragment>
          ))}
        </ThemedView>

        <Link href="/adm_home" asChild>
          <Pressable onPress={handleSubmit} style={styles.button}>
            <ThemedText style={styles.buttonText}>Salvar alterações</ThemedText>
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
  container: { flex: 1, padding: 24, alignItems: "center", justifyContent: "flex-start" },
  heading: { marginTop: 56, marginBottom: 8, textAlign: "center", fontSize: 22, fontWeight: "bold", color: "#6b42c1" },
  card: { width: "100%", maxWidth: 520, borderRadius: 20, padding: 20, marginBottom: 20 },
  fieldLabel: { marginBottom: 8, color: "#64748b", fontSize: 14 },
  input: { width: "100%", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16, fontSize: 16 },
  button: { width: "100%", maxWidth: 520, borderRadius: 16, paddingVertical: 16, alignItems: "center", marginBottom: 12, backgroundColor: "#6b42c1" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  link: { marginTop: 12, paddingVertical: 12, fontSize: 16, textAlign: "center", color: "#6b42c1" },
});
