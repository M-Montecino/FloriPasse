import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#8A8A8A",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="atracoes"
        options={{
          title: "Atrações",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="balloon" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

//    <Tabs.Screen
//        name="placeholder"
//        options={{
//          title: "exemplo",
//          tabBarIcon: ({ color, size }) => (
//            <Ionicons name="formato do icone" size={size} color={color} />
//          ),
//        }}
//      />
