import { GatewayProvider } from "@/context/GatewayContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useDefaultFonts } from "@/hooks/useDefaultFonts";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SessionProvider } from "@/context/AuthContext";
import { BACKEND_BASE_URL } from "@/helpers/applicationUrl";

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
    <SessionProvider>
      <GatewayProvider baseUrl={BACKEND_BASE_URL}>
        <ThemeProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="colmeia-reflections" />
            <Stack.Screen
              name="error"
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="success"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="cancel"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="politica-privacidade"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="termos-e-condicoes"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="sobre"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </GatewayProvider>
    </SessionProvider>
  );
}
