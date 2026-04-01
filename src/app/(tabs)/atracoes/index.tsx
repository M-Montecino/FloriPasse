import dados from "@/assets/dados.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Atracoes() {
  const [atracoes, setAtracoes] = useState<any[]>([]);
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchAtracoes();
      carregarFavoritos();
    }, []),
  );

  useEffect(() => {
    fetchAtracoes();
  }, []);

  function fetchAtracoes() {
    try {
      const lista = dados.atracoes;

      const formatted = lista.map((item: any) => {
        return {
          id: item.id,
          nome: item.nome,
          imagem: item.imagens[0],
          imagem2: item.imagens[1],
          descricao: item.descricao,
          bairro: item.endereco.bairro,
        };
      });

      setAtracoes(formatted);
    } catch (e) {
      console.log(e);
    }
  }

  async function carregarFavoritos() {
    try {
      const fav = await AsyncStorage.getItem("favoritos");
      const lista = fav ? JSON.parse(fav) : [];
      setFavoritos(lista);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ gap: 16, padding: 16 }}>
      {atracoes.map((atracao) => {
        const isFavorito = favoritos.includes(String(atracao.id));

        return (
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
                <Text style={styles.heart}>{isFavorito ? "❤️" : "🤍"}</Text>
              </View>
              <Text style={styles.title}>{atracao.nome}</Text>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#90B7BF",
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
});
