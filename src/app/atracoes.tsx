import dados from "@/assets/dados.json";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

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
            pathname: "/infomacoes",
            params: { id: atracao.id },
          }}
          key={atracao.id}
        >
          <View
            style={{
              backgroundColor: "#2ecc71",
              padding: 20,
              borderRadius: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {atracao.nome}
            </Text>

            <Text>{atracao.bairro}</Text>

            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: atracao.imagem }}
                style={{ width: 100, height: 100 }}
              />
              <Image
                source={{ uri: atracao.imagem2 }}
                style={{ width: 100, height: 100 }}
              />
            </View>
          </View>
        </Link>
      ))}
    </ScrollView>
  );
}
