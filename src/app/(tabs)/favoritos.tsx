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
            <View style={styles.view}>
              <Text style={styles.text}>{atracao.nome}</Text>

              <View style={{ flexDirection: "row" }}>
                <Image source={{ uri: atracao.imagem }} style={styles.image} />
              </View>
            </View>
          </Link>
        ))
      )}
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
  empty: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});
