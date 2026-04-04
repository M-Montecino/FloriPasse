import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: "Meus Passes" }} 
      />

      <Stack.Screen
        name="novo-passe"
        options={{
          title: "Comprar Passe",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}