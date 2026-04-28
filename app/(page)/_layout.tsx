import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(page)" />
        <Stack.Screen name="(partners)" />
        <Stack.Screen name="(help)" />
      </Stack>
    </SafeAreaProvider>
  );
}
