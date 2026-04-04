import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, Link } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal, Image } from "react-native";
import { Button } from "@/components/Button";

export type Passe = {
  id: string;
  dono: string;
  tipo: string;
  dataCompra: string;
};

export default function MeusPasses() {
  const [meusPasses, setMeusPasses] = useState<Passe[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  useFocusEffect(
    useCallback(() => {
      carregarPasses();
    }, [])
  );

  async function carregarPasses() {
    try {
      const dados = await AsyncStorage.getItem("passes");
      if (dados) {
        setMeusPasses(JSON.parse(dados));
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Meus Passes</Text>

      {meusPasses.length === 0 ? (
        <Text style={styles.vazio}>Nenhum passe adquirido ainda.</Text>
      ) : (
        meusPasses.map((passe) => {
          let estiloFundo = styles.fundoBronze;
          let totais = 3;
          let diasValidade = 3;

          if (passe.tipo === "Passe Plus") {
            estiloFundo = styles.fundoPrata;
            totais = 5;
            diasValidade = 5;
          }
          if (passe.tipo === "Passe Top") {
            estiloFundo = styles.fundoOuro;
            totais = 7;
            diasValidade = 7;
          }

          const compra = new Date(passe.dataCompra);
          const expiracao = new Date(compra.getTime() + diasValidade * 24 * 60 * 60 * 1000);
          const agora = new Date();
          const diffTempo = expiracao.getTime() - agora.getTime();
          const diasRestantes = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));

          const disponiveis = totais;

          const ativo = diasRestantes >= 0 && disponiveis > 0;

          let textoValidade = "Status: Expirado";
          if (ativo) {
            if (diasRestantes === 0) {
              textoValidade = "Expira hoje";
            } else if (diasRestantes === 1) {
              textoValidade = "Expira amanhã";
            } else {
              textoValidade = `Expira em: ${diasRestantes} dias`;
            }
          }

          return (
            <TouchableOpacity
              key={passe.id}
              style={[styles.cardBase, estiloFundo, !ativo && styles.cardInativo]}
              disabled={!ativo}
              onPress={() => setModalVisivel(true)}
            >
              <Text style={styles.textoDono}>{passe.dono}</Text>
              <Text style={styles.textoTipo}>{passe.tipo}</Text>

              <View style={styles.linhaDivisoria} />

              <Text style={styles.textoInfo}>
                Usos: {disponiveis} / {totais}
              </Text>
              
              <Text style={styles.textoInfo}>{textoValidade}</Text>
            </TouchableOpacity>
          );
        })
      )}

      <Link href="/passes/novo-passe" asChild>
        <Button label="Novo Passe"/>
      </Link>

      <Modal visible={modalVisivel} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalConteudo}>
            <Text style={styles.modalTitulo}>QR Code de Acesso</Text>
            
            <Image 
              source={require("@/assets/place-holder.png")} 
              style={styles.qrCode} 
            />

            <TouchableOpacity 
              style={styles.botaoFechar} 
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.textoBotaoFechar}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 10,
    color: "#222",
  },
  vazio: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
    marginBottom: 40,
    color: "#666",
  },
  cardBase: {
    width: "100%",
    padding: 24,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardInativo: {
    opacity: 0.4,
  },
  textoDono: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  textoTipo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 16,
    fontWeight: "500",
  },
  linhaDivisoria: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 16,
  },
  textoInfo: {
    fontSize: 18,
    color: "#222",
    marginBottom: 6,
    fontWeight: "600",
  },
  botaoComprar: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
  },
  textoBotao: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  fundoBronze: {
    backgroundColor: "#CD7F32",
  },
  fundoPrata: {
    backgroundColor: "#C0C0C0",
  },
  fundoOuro: {
    backgroundColor: "#FFD700",
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingTop: 150,
    paddingLeft: 20,
    paddingRight: 20,
  },
  modalConteudo: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 24,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
  },
  qrCode: {
    width: 250,
    height: 300,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 24,
  },
  botaoFechar: {
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
  },
  textoBotaoFechar: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  }
});