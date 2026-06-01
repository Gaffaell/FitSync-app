import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router, useLocalSearchParams } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

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

export default function ListaExercicios() {
  const { dia, id } = useLocalSearchParams();
  console.log(dia, id);
  const [exercicios, setExercicios] = useState<any[]>([]);

  const fetchExercicios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "exercicios"));
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setExercicios(lista);
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  };

  useEffect(() => {
    fetchExercicios();
  }, []);
  const theme = useColorScheme();
  const containerBg = theme === "dark" ? "#071014" : "#edf6ff";
  const cardBg = theme === "dark" ? "#111827" : "#ffffff";
  const cardShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";

  return (
    <ScrollView>
      <ThemedView style={[styles.container, { backgroundColor: containerBg }]}>
        <FlatList
          data={exercicios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} key={item.id}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.title}
                onPress={() =>
                  router.push({
                    pathname:
                      "/adm_screens/definir_treino/definir_treino_dia/definir_exercicio/definicao/[exercicio_id]",
                    params: {
                      exercicio_id: item.id.toString(),
                      id: id.toString(),
                      dia: dia.toString(),
                    },
                  })
                }
              >
                {item.nome}
              </ThemedText>
              <ThemedText style={styles.cardText}>{item.descricao}</ThemedText>
            </TouchableOpacity>
          )}
        />
        <Link href="/adm_home" asChild>
          <Pressable
            onPress={() => alert("Salvo com sucesso")}
            style={styles.button}
          >
            <ThemedText>Salvar</ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  item: {
    backgroundColor: "gray",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    alignSelf: "center",
  },
  list: {
    width: "100%",
    paddingBottom: 20,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
});
