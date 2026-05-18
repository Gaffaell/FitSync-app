import { Image } from "expo-image";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Controller, useForm } from "react-hook-form";

export default function HomeScreen() {
  const { control } = useForm();

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.reactLogo}
      />

      <ThemedText type="title" style={styles.title}>
        Bem-vindo(a)
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Acesse o sistema e gerencie alunos, treinos e feedbacks com estilo.
      </ThemedText>

      <View style={styles.card}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Usuário"
              placeholderTextColor="#ccc"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#ccc"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={styles.input}
            />
          )}
        />

        <Link href="/adm_home" asChild>
          <Pressable style={styles.buttonPrimary}>
            <ThemedText style={styles.buttonText}>Tela de adm</ThemedText>
          </Pressable>
        </Link>

        <Link href="/user_home" asChild>
          <Pressable style={styles.buttonSecondary}>
            <ThemedText style={styles.buttonText}>Tela de usuário</ThemedText>
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b0f16",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  reactLogo: {
    height: 120,
    width: 200,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#a020f0",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ccc",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    maxWidth: 400,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    borderWidth: 1,
    borderColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonPrimary: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
