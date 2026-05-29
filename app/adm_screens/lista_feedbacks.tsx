import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link, router } from "expo-router";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
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

export default function ListaFeedbacks() {
  const theme = useColorScheme();
  const containerBackground = theme === "dark" ? "#071014" : "#edf6ff";
  const itemBackground = theme === "dark" ? "#111827" : "#ffffff";
  const itemShadow = theme === "dark" ? "#000" : "#0a7ea4";
  const titleColor = theme === "dark" ? "#f8fafc" : "#0f4c81";
  const subtitleColor = theme === "dark" ? "#94a3b8" : "#4b6570";
  const itemStyle = {
    ...styles.item,
    backgroundColor: itemBackground,
    shadowColor: itemShadow,
  };

  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const fetchFeedbacks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "feedbacks"));
      const lista: any[] = [];
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });
      setFeedbacks(lista);
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <ScrollView>
      <ThemedView style={[styles.container, { backgroundColor: "#071014" }]}>
        <ThemedText
          type="title"
          style={[styles.heading, { color: titleColor }]}
        >
          Feedbacks
        </ThemedText>
        <ThemedText
          type="subtitle"
          style={[styles.subtitle, { color: subtitleColor }]}
        >
          Veja os comentários recentes de seus alunos.
        </ThemedText>

        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.list}
              key={item.id}
              onPress={() =>
                router.push({
                  pathname: "/adm_screens/details_feedback/[user_id]",
                  params: {
                    user_id: item.id_aluno.toString(),
                    dia: item.dia_semana.toString(),
                    feedback_opcao: item.feedback_opcao.toString(),
                    feedback_detalhado: item.feedback_detalhado.toString(),
                    data: item.data.toString(),
                  },
                })
              }
            >
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                Dia do treino: {item.dia_semana}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                Nome do aluno: {item.nome_aluno}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                Feedback resumindo: {item.feedback_opcao}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                Feedback detalhado: {item.feedback_detalhado}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                ID do aluno: {item.id_aluno}
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.nome}>
                Data do feedback: {item.data}
              </ThemedText>
            </TouchableOpacity>
          )}
        />

        <Link href="/adm_home" dismissTo>
          <ThemedText type="defaultSemiBold" style={styles.cardText}>
            Voltar para Home
          </ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  },
  subtitle: {
    marginBottom: 24,
    lineHeight: 24,
    maxWidth: 360,
    textAlign: "center",
  },
  list: {
    width: "100%",
    paddingBottom: 20,
  },
  item: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
  },
  nome: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
});
