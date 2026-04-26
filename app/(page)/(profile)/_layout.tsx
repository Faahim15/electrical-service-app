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
        <Stack.Screen name="my-quotedetais" />
        <Stack.Screen name="my-quotes" />
        <Stack.Screen name="my-reminder" />
        <Stack.Screen name="reminder-details" />
        <Stack.Screen name="save-guides " />
        <Stack.Screen name="favorite-partners" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="(setting)" />
      </Stack>
    </SafeAreaProvider>
  );
}
