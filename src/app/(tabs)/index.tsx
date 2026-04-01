import { Link } from "expo-router";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
            <Pressable style={styles.blockButton}>
              <Text style={styles.text}>Bem-Vindo ao FloriPasse</Text>
            </Pressable>
          </Link>
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "flex-start",
    resizeMode: "cover",
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
