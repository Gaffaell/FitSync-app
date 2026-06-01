import { Image } from "expo-image";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
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
  const colorScheme = useColorScheme();
  const buttonBackground = colorScheme === "dark" ? "#2563eb" : "#007bff";

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Email"
              placeholderTextColor={"white"}
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
          )}
        />
        <Controller
          control={control}
          name="senha"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Senha"
              placeholderTextColor={"white"}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
            />
          )}
        />

        {message ? (
          <View style={styles.messageBox}>
            <ThemedText type="default" style={styles.messageText}>
              {message}
            </ThemedText>
          </View>
        ) : null}

        <Pressable
          disabled={loading}
          onPress={handleSubmit((data) => handleLogin("adm", data))}
          style={[styles.button, { backgroundColor: buttonBackground }]}
        >
          <ThemedText>
            {loading ? "Verificando adm..." : "Login como adm"}
          </ThemedText>
        </Pressable>
        <Pressable
          disabled={loading}
          onPress={handleSubmit((data) => handleLogin("usuario", data))}
          style={[styles.button, { backgroundColor: buttonBackground }]}
        >
          <ThemedText>
            {loading ? "Verificando usuário..." : "Login como usuário"}
          </ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    color: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  messageBox: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 5,
    marginBottom: 10,
  },
  messageText: {
    color: "#fde68a",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
