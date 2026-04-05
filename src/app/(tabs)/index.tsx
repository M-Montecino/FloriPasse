import { Link } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Index() {
  const scrollRef= useRef<ScrollView>(null);

  useEffect(() => {
    let indice = 0;
    const tempo = setInterval(() => {
      indice = indice === 2 ? 0 : indice + 1;
      scrollRef.current?.scrollTo({ x: indice * width, animated: true });
    }, 5000);

    return () => clearInterval(tempo);
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <ImageBackground source={require("@/assets/fotoPonte1.jpeg")} style={{ width, height: "100%" }} />
          <ImageBackground source={require("@/assets/fotoPonte2.jpg")} style={{ width, height: "100%" }} />
          <ImageBackground source={require("@/assets/fotoPonte3.jpg")} style={{ width, height: "100%" }} />
        </ScrollView>

        <View style={styles.botaoContainer}>
          <Link href="/atracoes" asChild>
            <Pressable style={styles.blockButton}>
              <Text style={styles.text}>Bem-Vindo ao FloriPasse</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  botaoContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-start"
  },
  text: {
    color: "#E7DBD9",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  blockButton: {
    backgroundColor: "#7E1402",
    marginBottom: "30%",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 180,
  },
});
