import { Stack } from "expo-router";

export default function AtracoesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Atrações" }} />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes da Atração",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7, 1],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
