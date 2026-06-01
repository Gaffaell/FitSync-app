import { Link, router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function InformacoesAluno() {
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

  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      if (typeof id !== "string") return;
      const docRef = doc(db, "aluno", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    }

    fetchUser();
  }, [id]);

  if (!user) {
    return <ThemedText>Loading...</ThemedText>;
  }

  async function updateUser(id: any) {
    try {
      if (typeof id !== "string") return;
      const userRef = doc(db, "aluno", id);
      console.log(user);
      await updateDoc(userRef, {
        nome: String(user.nome ?? ""),
        idade: String(user.idade ?? ""),
        email: String(user.email ?? ""),
        senha: String(user.senha ?? ""),
        altura: String(user.altura ?? ""),
        peso: String(user.peso ?? ""),
        sexo: String(user.sexo ?? ""),
        telefone: String(user.telefone ?? ""),
      });
      alert("Aluno atualizado com sucesso!");
      router.push(`/adm_screens/details/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.titleContainer}>
          Editar informações de aluno
        </ThemedText>

        <ThemedText>Nome: </ThemedText>
        <TextInput
          placeholder="Novo nome"
          style={styles.input}
          value={user.nome ?? ""}
          onChangeText={(text) => setUser({ ...user, nome: text })}
        />
        <ThemedText>Idade: </ThemedText>
        <TextInput
          placeholder="Nova idade"
          style={styles.input}
          value={user.idade ?? ""}
          keyboardType="numeric"
          onChangeText={(text) => setUser({ ...user, idade: text })}
        />
        <ThemedText>Email: </ThemedText>
        <TextInput
          placeholder="Novo email"
          style={styles.input}
          value={user.email ?? ""}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setUser({ ...user, email: text })}
        />
        <ThemedText>Senha: </ThemedText>
        <TextInput
          placeholder="Nova senha"
          style={styles.input}
          value={user.senha ?? ""}
          onChangeText={(text) => setUser({ ...user, senha: text })}
        />
        <ThemedText>Altura: </ThemedText>
        <TextInput
          placeholder="Nova altura"
          style={styles.input}
          value={user.altura ?? ""}
          onChangeText={(text) => setUser({ ...user, altura: text })}
        />
        <ThemedText>Peso: </ThemedText>
        <TextInput
          placeholder="Novo peso"
          style={styles.input}
          value={user.peso ?? ""}
          onChangeText={(text) => setUser({ ...user, peso: text })}
        />
        <ThemedText>Sexo: </ThemedText>
        <TextInput
          placeholder="Novo sexo"
          style={styles.input}
          value={user.sexo ?? ""}
          onChangeText={(text) => setUser({ ...user, sexo: text })}
        />
        <ThemedText>Telefone: </ThemedText>
        <TextInput
          placeholder="Novo telefone"
          style={styles.input}
          value={user.telefone ?? ""}
          keyboardType="phone-pad"
          onChangeText={(text) => setUser({ ...user, telefone: text })}
        />

        <TouchableOpacity onPress={() => updateUser(id)}>
          <ThemedText style={styles.button}>Salvar informações</ThemedText>
        </TouchableOpacity>
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
    width: "100%",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button_2: {
    backgroundColor: "yellow",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  button_3: {
    backgroundColor: "red",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
});
