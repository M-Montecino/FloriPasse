import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <ImageBackground
          source={require("@/assets/fotoPonte.jpeg")}
          style={styles.image}
        >
          <Link href="/atracoes" asChild>
            <View style={styles.blockButton}>
              <Text style={styles.text}>Bem-Vindo ao FloriPasse</Text>
            </View>
          </Link>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
  },
  text: {
    color: "#E7DBD9",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
  blockButton: {
    backgroundColor: "#7E1402",
  },
});
