import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, TextInput, Alert, StyleSheet, View, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";
import { Passe } from ".";

const TIPOS = [
  {
    nome: "Passe Básico",
    atracoes: "Ingresso em 3 atrações",
    validade: "Valido por 3 dias",
    preco: "R$ 89"
  },
  {
    nome: "Passe Plus",
    atracoes: "Ingresso em 5 atrações",
    validade: "Válido por 5 dias",
    preco: "R$ 149"
  },
  {
    nome: "Passe Top",
    atracoes: "Ingresso em 7 atrações",
    validade: "Válido por 7 dias",
    preco: "R$ 199"
  }
];

export default function NovoPasse() {
  const [dono, setDono] = useState("");

  async function salvarPasse(tipo: string) {
    const novoPasse: Passe = {
      id: Date.now().toString(),
      dono,
      tipo,
      dataCompra: new Date().toISOString(),
    };

    const dados = await AsyncStorage.getItem("passes");
    const passes = dados ? JSON.parse(dados) : [];

    passes.push(novoPasse);
    await AsyncStorage.setItem("passes", JSON.stringify(passes));
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do titular do passe:</Text>
      <TextInput
        style={styles.input}
        value={dono}
        onChangeText={setDono}
        placeholder="Digite o nome..."
      />

      {TIPOS.map((passeInfo) => {
        let estiloNivel = styles.bronze;
        if (passeInfo.nome === "Passe Plus") estiloNivel = styles.prata;
        if (passeInfo.nome === "Passe Top") estiloNivel = styles.ouro;

        return (
          <Link
            key={passeInfo.nome}
            href="/(tabs)/passes"
            asChild
            onPress={async (e) => {
              if (dono.trim() === "") {
                e.preventDefault();
                
                if (Platform.OS === "web") {
                  alert("Por favor, digite o nome do dono do passe.");
                } else {
                  Alert.alert("Aviso", "Por favor, digite o nome do dono do passe.");
                }
                
                return;
              }
              await salvarPasse(passeInfo.nome);
            }}
          >
            <TouchableOpacity style={StyleSheet.flatten([styles.cardBase, estiloNivel])}>
              <Text style={styles.textoTitulo}>{passeInfo.nome}</Text>
              
              <View style={styles.infoContainer}>
                <Text style={styles.textoInfo}>{passeInfo.atracoes}</Text>
                <Text style={styles.textoInfo}>{passeInfo.validade}</Text>
              </View>

              <Text style={styles.textoPreco}>{passeInfo.preco}</Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 24,
  },
  cardBase: {
    width: "100%",
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginBottom: 12,
  },
  infoContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  textoInfo: {
    fontSize: 16,
    textAlign: "center",
    color: "#222",
    marginBottom: 4,
  },
  textoPreco: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#111",
    marginTop: 8,
  },
  bronze: {
    backgroundColor: "#CD7F32",
  },
  prata: {
    backgroundColor: "#C0C0C0",
  },
  ouro: {
    backgroundColor: "#FFD700",
  }
});