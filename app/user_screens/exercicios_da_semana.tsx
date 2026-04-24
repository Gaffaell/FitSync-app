import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ExerciciosSemana() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Dia dos exercicios</ThemedText>
      {/* 
      Aqui você pode adicionar a lista de exercícios de cada dia da semana,
      busca em outro arquivo a lógica para exibir os exercícios de cada dia, ou seja,
      criar um componente genérico que recebe os exercícios como props e renderiza a lista de exercícios de cada dia da semana.
      pega as informaçoes do dia da semana que o usuario clicou no banco de dados
      */}
      <Link
        href="/user_screens/exercicios_do_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "blue" }}>
          Segunda-feira
        </ThemedText>
        <ThemedText type="title" style={{ color: "green" }}>
          Terça-feira
        </ThemedText>
        <ThemedText type="title" style={{ color: "yellow" }}>
          Quarta-feira
        </ThemedText>
        <ThemedText type="title" style={{ color: "red" }}>
          Quinta-feira
        </ThemedText>
        <ThemedText type="title" style={{ color: "purple" }}>
          Sexta-feira
        </ThemedText>
      </Link>
      <Link href="/user_home" dismissTo style={styles.link}>
        <ThemedText type="link">HOME</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
