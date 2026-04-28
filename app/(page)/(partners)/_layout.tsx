import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="accessory-building" />
        <Stack.Screen name="partner-categorie" />
        <Stack.Screen name="partner-details" />
      </Stack>
    </SafeAreaProvider>
  );
}
