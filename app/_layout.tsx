import { ThemeProvider } from "@/context/ThemeContext";
import { useDefaultFonts } from "@/hooks/useDefaultFonts";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const { fontsLoaded, error } = useDefaultFonts();

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </ThemeProvider>
  );
}
