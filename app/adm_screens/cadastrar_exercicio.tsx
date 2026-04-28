import { Pressable, ScrollView, StyleSheet, TextInput } from "react-native";
import { Link } from "expo-router";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Controller, useForm } from "react-hook-form";

export default function CadastrarAluno() {
  const { control, handleSubmit } = useForm();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titleContainer}>Cadastrar aluno</ThemedText>
      <Controller
        control={control}
        name="nome_exercicio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Nome"
            placeholderTextColor={"white"}
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="descricao_exercicio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Descrição"
            placeholderTextColor={"white"}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
          />
        )}
      />
      <Controller
        control={control}
        name="midia_exercicio"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Midia"
            placeholderTextColor={"white"}
            value={value}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
          />
        )}
      />
      <Link href="/adm_screens/lista_exercicios" asChild>
        <Pressable
          onPress={() => alert("Exercíco cadastrado com sucesso")}
          style={styles.button}
        >
          <ThemedText>Salvar</ThemedText>
        </Pressable>
      </Link>
      <Link href="/adm_home" dismissTo style={styles.link}>
        <ThemedText type="link">HOME</ThemedText>
      </Link>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
