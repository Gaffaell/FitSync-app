import { ThemedText } from "@/components/themed-text";
import { Link } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import { FlatList, ScrollView, StatusBar, StyleSheet } from "react-native";

export default function ListaAlunos() {
  {/* DATA terá os dados de exercicios do banco de dados*/ }
  const DATA = [
    {
      id: 'ksadief',
      title: 'aluno 1',
    },
    {
      id: 'ksaadfksjdief',
      title: 'aluno 2',
    },
    {
      id: 'ksadief12weefds',
      title: 'aluno 3',
    },
    {
      id: 'ksadief235r3sdfasd',
      title: 'aluno 4',
    },
    {
      id: 'ksadiefergkdvjfk',
      title: 'aluno 5',
    },
  ]

  type ItemProps = { title: string };

  const Item = ({ title }: ItemProps) => (
    <ThemedView style={styles.item}>
      <Link
        href="/adm_screens/informacoes_aluno"
        dismissTo
        style={styles.link}
      >
        <ThemedText style={styles.title}>{title}</ThemedText>
      </Link>
    </ThemedView >
  )
  return (
    <ScrollView>
      <ThemedView>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
        <Link href="/adm_home" dismissTo style={styles.link}>
          <ThemedText type="link">HOME</ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  item: {
    backgroundColor: 'gray',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 32,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    alignSelf: 'center'
  },
})
