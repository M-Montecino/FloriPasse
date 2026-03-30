import dados from "@/assets/dados.json";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Atracoes() {
  const [atracoes, setAtracoes] = useState<any[]>([]);

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

  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {atracoes.map((atracao) => (
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
      ))}
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
});
