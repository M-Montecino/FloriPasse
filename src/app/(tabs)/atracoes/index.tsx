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
            <View style={styles.view}>
              <View style={styles.header}>
                <Text style={styles.text}>{atracao.nome}</Text>
              </View>
              <Image source={{ uri: atracao.imagem }} style={styles.image} />
              <Text style={styles.heart}>{isFavorito ? "🤍" : ""}</Text>
            </View>
          </Link>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#90B7BF",
    padding: 20,
    borderRadius: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  heart: {
    fontSize: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
