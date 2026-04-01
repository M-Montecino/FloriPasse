import dados from "@/assets/dados.json";
import { Button } from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

export default function AtracaoDetalhes() {
  const { id } = useLocalSearchParams();
  const atracao = dados.atracoes.find((a) => String(a.id) === String(id));

  const [playing, setPlaying] = useState(false);
  const [favorito, setFavorito] = useState(false);

  //verificação de favorito
  useEffect(() => {
    verificarFavorito();
  }, []);

  async function verificarFavorito() {
    try {
      const favoritos = await AsyncStorage.getItem("favoritos");
      const lista = favoritos ? JSON.parse(favoritos) : [];

      if (lista.includes(String(id))) {
        setFavorito(true);
      }
    } catch (e) {
      console.log(e);
    }
  }

  //função de adicionar
  async function toggleFavorito() {
    try {
      const favoritos = await AsyncStorage.getItem("favoritos");
      let lista = favoritos ? JSON.parse(favoritos) : [];

      if (lista.includes(String(id))) {
        // remove
        lista = lista.filter((item: string) => item !== String(id));
        setFavorito(false);
      } else {
        // adiciona
        lista.push(String(id));
        setFavorito(true);
      }

      await AsyncStorage.setItem("favoritos", JSON.stringify(lista));
    } catch (e) {
      console.log(e);
    }
  }

  //verificação atração
  if (!atracao) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Atração não encontrada!</Text>
      </View>
    );
  }
  const enderecoCompleto = encodeURIComponent(`
    ${atracao.endereco.logradouro},
    ${atracao.endereco.bairro},
    ${atracao.endereco.cidade} - ${atracao.endereco.estado}`);

  const video_id = atracao.videos[0].split("v=")[1]?.split("&")[0];
  const mapUrl = String(
    Platform.select({
      ios: `maps:0,0?q=${enderecoCompleto}`,
      android: `geo:0,0?q=${enderecoCompleto}`,
      web: `https://maps.google.com/maps?q=${enderecoCompleto}`,
    }),
  );

  const urlMapa = `https://maps.google.com/maps?q=${enderecoCompleto}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const urlMapaWebView = `https://www.google.com/maps/search/?api=1&query=${enderecoCompleto}`;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>{atracao.nome}</Text>
      <Button //botão de favorito
        onPress={toggleFavorito}
        label={
          favorito ? "❤️ Remover dos Favoritos" : "🤍 Salvar nos Favoritos"
        }
      />
      <Text style={styles.subtitle}>Bairro: {atracao.endereco.bairro}</Text>
      <Text style={styles.subtitle}>Aberto: {atracao.funcionamento.dias}</Text>
      <Text style={styles.subtitle}>
        Horário: {atracao.funcionamento.horario}
      </Text>

      <View style={styles.imageContainer}>
        {atracao.imagens[0] && (
          <Image source={{ uri: atracao.imagens[0] }} style={styles.image} />
        )}
        {atracao.imagens[1] && (
          <Image source={{ uri: atracao.imagens[1] }} style={styles.image} />
        )}
      </View>
      <View style={styles.videoContainer}>
        {atracao.videos[0] && (
          <YoutubePlayer
            height={220}
            play={playing}
            videoId={video_id}
            onChangeState={(state: boolean | string) => {
              if (state === "ended") setPlaying(false);
            }}
          ></YoutubePlayer>
        )}
      </View>

      <Text style={styles.texto}>{atracao.descricao}</Text>
      <Button
        onPress={() => Linking.openURL(`mailto:${atracao.contato.email}`)}
        label="Enviar E-mail"
      />
      <Button
        onPress={() => Linking.openURL(`tel:${atracao.contato.telefone}`)}
        label={`Ligar ${atracao.contato.telefone}`}
      />
      <Button
        onPress={() =>
          Linking.openURL(`https://wa.me/${atracao.contato.whatsapp}`)
        }
        label={`WhatsApp ${atracao.contato.whatsapp}`}
      />
      <Button onPress={() => Linking.openURL(mapUrl)} label="Endereço" />
      <Text style={styles.mapTitle}>Localização</Text>
      <View style={styles.mapContainer}>
        {Platform.OS === "web" ? (
          <iframe
            src={urlMapa}
            style={{ border: 0, width: "100%", height: "100%" }}
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            <View style={styles.mapContainer}>
              <WebView source={{ uri: urlMapaWebView }} style={{ flex: 1 }} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
  },
  scrollContainer: {
    padding: 16,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  imageContainer: {
    flexDirection: "row",
    gap: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  texto: {
    fontSize: 16,
    marginTop: 10,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  mapContainer: {
    height: 500,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  videoContainer: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
});
