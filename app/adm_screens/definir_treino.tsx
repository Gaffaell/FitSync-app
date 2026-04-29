import { Link } from "expo-router";
import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function DefinirTreino() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Definir treino da semana</ThemedText>
      {/* 
      Aqui você pode adicionar a lista de exercícios de cada dia da semana,
      busca em outro arquivo a lógica para exibir os exercícios de cada dia, ou seja,
      criar um componente genérico que recebe os exercícios como props e renderiza a lista de exercícios de cada dia da semana.
      pega as informaçoes do dia da semana que o usuario clicou no banco de dados
      */}
      <Link
        href="/adm_screens/definir_treino_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "blue" }}>
          Segunda-feira
        </ThemedText>
      </Link>
      <Link
        href="/adm_screens/definir_treino_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "green" }}>
          Terça-feira
        </ThemedText>
      </Link>
      <Link
        href="/adm_screens/definir_treino_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "yellow" }}>
          Quarta-feira
        </ThemedText>
      </Link>
      <Link
        href="/adm_screens/definir_treino_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "red" }}>
          Quinta-feira
        </ThemedText>
      </Link>
      <Link
        href="/adm_screens/definir_treino_dia"
        dismissTo
        style={styles.link}
      >
        <ThemedText type="title" style={{ color: "purple" }}>
          Sexta-feira
        </ThemedText>
      </Link>
      <Link href="/adm_home" dismissTo style={styles.link}>
        <ThemedText type="link">HOME</ThemedText>
      </Link>
      <Link href="/adm_screens/informacoes_aluno" dismissTo style={styles.link}>
        <ThemedText type="link">Voltar</ThemedText>
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
