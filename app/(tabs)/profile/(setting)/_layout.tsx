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
        <Stack.Screen name="notification-setting" />
        <Stack.Screen name="permissions" />
        <Stack.Screen name="faqs" />
        <Stack.Screen name="terms" />
        <Stack.Screen name="aboutus" />
      </Stack>
    </SafeAreaProvider>
  );
}
