import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  Alert,
  View,
} from "react-native";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, deleteDoc } from "firebase/firestore";

// 🔹 Configuração do Firebase
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

export default function InformacoesAluno() {
  const { id } = useLocalSearchParams();
  const [aluno, setAluno] = useState<any>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false); // 🔹 controle da visibilidade da senha

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
          setAluno(snap.data());
        } else {
          Alert.alert("Erro", "Aluno não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar aluno:", error);
      }
    }
    fetchAluno();
  }, [id]);

  const handleDelete = async () => {
    try {
      if (typeof id !== "string") return;
      await deleteDoc(doc(db, "aluno", id));
      Alert.alert("Sucesso", "Aluno excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
      Alert.alert("Erro", "Não foi possível excluir o aluno.");
    }
  };

  if (!aluno) {
    return <ThemedText>Carregando informações do aluno...</ThemedText>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.heading}>
          Informações do Aluno
        </ThemedText>

        <ThemedView style={[styles.card, { backgroundColor: cardBackground }]}>
          {Object.keys(aluno).map((field) => (
            <React.Fragment key={field}>
              <ThemedText type="defaultSemiBold" style={styles.fieldLabel}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </ThemedText>

              {/* 🔹 Campo especial para senha */}
              {field === "senha" ? (
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: inputBackground, color: inputColor, flex: 1 },
                    ]}
                    value={String(aluno[field])}
                    editable={false}
                    secureTextEntry={!mostrarSenha}
                  />
                  <Pressable
                    onPress={() => setMostrarSenha(!mostrarSenha)}
                    style={styles.toggleButton}
                  >
                    <ThemedText style={styles.toggleText}>
                      {mostrarSenha ? "Ocultar" : "Mostrar"}
                    </ThemedText>
                  </Pressable>
                </View>
              ) : (
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: inputBackground, color: inputColor },
                  ]}
                  value={String(aluno[field])}
                  editable={false}
                />
              )}
            </React.Fragment>
          ))}
        </ThemedView>

        {/* 🔹 Botão para editar */}
        <Link href={{ pathname: "/adm_screens/editar_informacoes_aluno", params: { id } }} asChild>
          <Pressable style={styles.buttonEdit}>
            <ThemedText style={styles.buttonText}>Editar informações</ThemedText>
          </Pressable>
        </Link>

        {/* 🔹 Botão para excluir */}
        <Pressable onPress={handleDelete} style={styles.buttonDelete}>
          <ThemedText style={styles.buttonTextDelete}>Excluir aluno</ThemedText>
        </Pressable>

        {/* 🔹 Link para voltar */}
        <Link href="/adm_home" dismissTo>
          <ThemedText type="link" style={styles.link}>
            Voltar para Home
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

// 🔹 Estilos
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#6b42c1",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  fieldLabel: { marginBottom: 8, color: "#64748b", fontSize: 14 },
  input: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#6b42c1",
  },
  toggleText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  buttonEdit: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#6b42c1",
  },
  buttonDelete: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#facc15",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  buttonTextDelete: { color: "#000", fontSize: 16, fontWeight: "700" },
  link: {
    marginTop: 12,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#6b42c1",
  },
});
