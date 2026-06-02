import { router } from "expo-router";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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

type LoginForm = {
  email: string;
  senha: string;
};

export default function HomeScreen() {
  const { control, handleSubmit } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      senha: "",
    },
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const accentColor = useThemeColor({}, "accent");
  const buttonColor = useThemeColor({}, "button");
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const inputBackground = useThemeColor(
    { light: "#F8FAFC", dark: "#111827" },
    "background",
  );
  const inputTextColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor(
    { light: "#94A3B8", dark: "#94A3B8" },
    "text",
  );

  const handleLogin = async (role: "adm" | "usuario", data: LoginForm) => {
    setMessage("");
    setLoading(true);

    try {
      const collectionName = role === "adm" ? "adm" : "aluno";
      const usersQuery = query(
        collection(db, collectionName),
        where("email", "==", data.email),
        where("senha", "==", data.senha),
      );
      const querySnapshot = await getDocs(usersQuery);

      if (querySnapshot.empty) {
        setMessage("Credenciais inválidas. Verifique e tente novamente.");
      } else {
        const userDoc = querySnapshot.docs[0];
        const id = userDoc.id;

        if (role === "adm") {
          router.push("/adm_home");
        } else {
          router.push({ pathname: "/user_home", params: { user_id: id } });
        }
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Erro ao conectar ao banco de dados. Tente novamente mais tarde.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={[styles.page, { backgroundColor: pageBackground }]}>
      <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
        <ThemedText type="title" style={styles.heroTitle}>
          Bem-vindo ao FitSync
        </ThemedText>
        <ThemedText style={styles.heroSubtitle}>
          Acesse sua conta e acompanhe seu plano de treino com as cores do seu
          novo tema.
        </ThemedText>
      </ThemedView>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: inputTextColor,
              },
            ]}
          />
        )}
      />
      <Controller
        control={control}
        name="senha"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Senha"
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={[
              styles.input,
              {
                backgroundColor: inputBackground,
                borderColor: accentColor,
                color: inputTextColor,
              },
            ]}
          />
        )}
      />

      {message ? (
        <View style={[styles.messageBox, { borderColor: accentColor }]}>
          <ThemedText
            type="default"
            style={[styles.messageText, { color: inputTextColor }]}
          >
            {message}
          </ThemedText>
        </View>
      ) : null}

      <Pressable
        disabled={loading}
        onPress={handleSubmit((data) => handleLogin("adm", data))}
        style={[styles.button, { backgroundColor: buttonColor }]}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Verificando adm..." : "Login como adm"}
        </ThemedText>
      </Pressable>
      <Pressable
        disabled={loading}
        onPress={handleSubmit((data) => handleLogin("usuario", data))}
        style={[styles.button, { backgroundColor: buttonColor }]}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Verificando usuário..." : "Login como usuário"}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    width: "100%",
    maxWidth: 520,
    borderWidth: 1,
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  messageBox: {
    width: "100%",
    maxWidth: 520,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  messageText: {
    color: "#fde68a",
  },
  button: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#FB923C",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 5,
  },
  buttonText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
});
