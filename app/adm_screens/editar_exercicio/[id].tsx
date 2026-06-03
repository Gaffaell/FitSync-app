import { Link, router, useLocalSearchParams } from "expo-router";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function InformacoesExercicio() {
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

  const { id } = useLocalSearchParams();
  const [exercicio, setExercicio] = useState<any>(null);

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

  useEffect(() => {
    async function fetchExercicio() {
      if (typeof id !== "string") return;
      const docRef = doc(db, "exercicios", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExercicio(docSnap.data());
      }
    }

    fetchExercicio();
  }, [id]);

  if (!exercicio) {
    return <ThemedText>Loading...</ThemedText>;
  }

  async function updateExercicio(id: any) {
    try {
      if (typeof id !== "string") return;
      const exercicioRef = doc(db, "exercicios", id);
      await updateDoc(exercicioRef, {
        nome: exercicio.nome,
        descricao: exercicio.descricao,
      });
      alert("Exercício atualizado com sucesso!");
      router.push(`/adm_screens/lista_exercicios`);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteExercicio(id: any) {
    try {
      if (typeof id !== "string") return;
      await deleteDoc(doc(db, "exercicios", id));
      alert("Exercício excluído com sucesso!");
      router.push("/adm_screens/lista_exercicios");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText
            type="title"
            style={[styles.heroTitle, { color: "#fff" }]}
          >
            Editar exercício
          </ThemedText>
          <ThemedText
            style={[styles.heroSubtitle, { color: "rgba(255,255,255,0.92)" }]}
          >
            Ajuste o nome e a descrição do exercício com o visual do sistema.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.card,
            { backgroundColor: cardBackground, borderColor: accentColor },
          ]}
        >
          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Nome
            </ThemedText>
            <TextInput
              placeholder="Novo nome"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  backgroundColor: inputBackground,
                  color: inputColor,
                  borderColor: accentColor,
                },
              ]}
              value={exercicio.nome}
              onChangeText={(text) =>
                setExercicio({ ...exercicio, nome: text })
              }
            />
          </View>
          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Descrição
            </ThemedText>
            <TextInput
              placeholder="Nova descrição"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  backgroundColor: inputBackground,
                  color: inputColor,
                  borderColor: accentColor,
                  minHeight: 100,
                },
              ]}
              value={exercicio.descricao}
              multiline
              onChangeText={(text) =>
                setExercicio({ ...exercicio, descricao: text })
              }
            />
          </View>
        </ThemedView>

        <Pressable
          onPress={() => updateExercicio(id)}
          style={[
            styles.primaryButton,
            { backgroundColor: buttonColor, shadowColor: buttonColor },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
            Salvar informações
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => deleteExercicio(id)}
          style={[styles.secondaryButton, { borderColor: accentColor }]}
        >
          <ThemedText
            type="defaultSemiBold"
            style={[styles.secondaryButtonText, { color: accentColor }]}
          >
            Excluir exercício
          </ThemedText>
        </Pressable>

        <Link href="/adm_home" dismissTo style={[styles.linkButton]}>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  heroTitle: {
    fontSize: 28,
    marginBottom: 10,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    marginBottom: 20,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  fieldGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  primaryButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 12,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  linkButton: {
    width: "100%",
    maxWidth: 520,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
