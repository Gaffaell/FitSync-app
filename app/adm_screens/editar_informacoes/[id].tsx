import { Link, router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
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

  const accentColor = useThemeColor({}, "accent");
  const buttonColor = useThemeColor({}, "button");
  const pageBackground = useThemeColor(
    { light: "#F3F4FF", dark: "#020617" },
    "background",
  );
  const cardBackground = useThemeColor(
    { light: "#FFFFFF", dark: "#111827" },
    "background",
  );
  const textColor = useThemeColor({}, "text");
  const subtitleColor = useThemeColor(
    { light: "#475569", dark: "#94A3B8" },
    "text",
  );

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <ThemedView
        style={[styles.container, { backgroundColor: pageBackground }]}
      >
        <ThemedView style={[styles.hero, { backgroundColor: accentColor }]}>
          <ThemedText type="title" style={styles.heroTitle}>
            Editar informações
          </ThemedText>
          <ThemedText style={styles.heroSubtitle}>
            Atualize os dados do aluno com o mesmo visual roxo e laranja do
            sistema.
          </ThemedText>
        </ThemedView>

        <ThemedView
          style={[
            styles.card,
            {
              backgroundColor: cardBackground,
              borderColor: accentColor,
              shadowColor: accentColor,
            },
          ]}
        >
          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Nome
            </ThemedText>
            <TextInput
              placeholder="Novo nome"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.nome ?? ""}
              onChangeText={(text) => setUser({ ...user, nome: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Idade
            </ThemedText>
            <TextInput
              placeholder="Nova idade"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.idade ?? ""}
              keyboardType="numeric"
              onChangeText={(text) => setUser({ ...user, idade: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Email
            </ThemedText>
            <TextInput
              placeholder="Novo email"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.email ?? ""}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Senha
            </ThemedText>
            <TextInput
              placeholder="Nova senha"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.senha ?? ""}
              onChangeText={(text) => setUser({ ...user, senha: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Altura
            </ThemedText>
            <TextInput
              placeholder="Nova altura"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.altura ?? ""}
              onChangeText={(text) => setUser({ ...user, altura: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Peso
            </ThemedText>
            <TextInput
              placeholder="Novo peso"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.peso ?? ""}
              onChangeText={(text) => setUser({ ...user, peso: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Sexo
            </ThemedText>
            <TextInput
              placeholder="Novo sexo"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.sexo ?? ""}
              onChangeText={(text) => setUser({ ...user, sexo: text })}
            />
          </View>

          <View style={styles.fieldGroup}>
            <ThemedText style={[styles.label, { color: subtitleColor }]}>
              Telefone
            </ThemedText>
            <TextInput
              placeholder="Novo telefone"
              placeholderTextColor="rgba(148, 163, 184, 0.8)"
              style={[
                styles.input,
                {
                  color: textColor,
                  backgroundColor: pageBackground,
                  borderColor: accentColor,
                },
              ]}
              value={user.telefone ?? ""}
              keyboardType="phone-pad"
              onChangeText={(text) => setUser({ ...user, telefone: text })}
            />
          </View>

          <TouchableOpacity
            onPress={() => updateUser(id)}
            style={[styles.saveButton, { backgroundColor: buttonColor }]}
          >
            <ThemedText type="defaultSemiBold" style={styles.saveButtonText}>
              Salvar informações
            </ThemedText>
          </TouchableOpacity>

          <Link href="/adm_home" dismissTo style={styles.linkButton}>
            <ThemedText
              type="defaultSemiBold"
              style={[styles.linkText, { color: accentColor }]}
            >
              Voltar para Home
            </ThemedText>
          </Link>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 24,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  hero: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
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
  card: {
    width: "100%",
    maxWidth: 520,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 5,
  },
  fieldGroup: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    fontSize: 16,
  },
  saveButton: {
    width: "100%",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 5,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  linkButton: {
    width: "100%",
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
  },
});
