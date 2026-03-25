import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Index() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>OLA!!</Text>
    </View>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Index} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
