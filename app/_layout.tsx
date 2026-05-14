import "@/global.css";
import { store } from "@/src/redux/store";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Toaster } from "sonner-native";

import { AnimatedSplashScreen } from "@/src/components/common/AnimatedSplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      if (!fontsLoaded) return;

      // Native splash hide
      await SplashScreen.hideAsync();

      // Show custom splash for 2 sec
      setTimeout(() => {
        setShowCustomSplash(false);
      }, 2000);
    }

    prepare();
  }, [fontsLoaded]);

  // Custom splash
  if (!fontsLoaded || showCustomSplash) {
    return <AnimatedSplashScreen />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
        <Toaster />
      </Provider>
    </GestureHandlerRootView>
  );
}
