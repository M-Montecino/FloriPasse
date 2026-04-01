import dados from "@/assets/dados.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Favoritos() {
  const [atracoes, setAtracoes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      carregarFavoritos();
    }, []),
  );

  async function carregarFavoritos() {
    try {
      const favoritos = await AsyncStorage.getItem("favoritos");
      const listaFavoritos = favoritos ? JSON.parse(favoritos) : [];

      const lista = dados.atracoes;

      //filtro de favoritos
      const filtrados = lista.filter((item: any) =>
        listaFavoritos.includes(String(item.id)),
      );

      const formatted = filtrados.map((item: any) => {
        return {
          id: item.id,
          nome: item.nome,
          imagem: item.imagens[0],
          descricao: item.descricao,
          bairro: item.endereco.bairro,
        };
      });

      setAtracoes(formatted);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {atracoes.length === 0 ? (
        <Text style={styles.empty}>Você ainda não tem favoritos 🤍</Text>
      ) : (
        atracoes.map((atracao) => (
          <Link
            href={{
              pathname: `/atracoes/[id]`,
              params: { id: atracao.id },
            }}
            key={atracao.id}
          >
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <Image source={{ uri: atracao.imagem }} style={styles.image} />
                <Text style={styles.heart}>❤️</Text>
              </View>
              <Text style={styles.title}>{atracao.nome}</Text>
            </View>
          </Link>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#e094be",
    borderRadius: 20,
    padding: 12,

    //sombra
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  imageWrapper: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#f0f0f0",
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
    fontSize: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});
