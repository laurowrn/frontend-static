import { GatewayProvider } from "@/context/GatewayContext";
import { useDefaultFonts } from "@/hooks/useDefaultFonts";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SessionProvider } from "@/context/AuthContext";
import { BACKEND_BASE_URL } from "@/helpers/applicationUrl";
import { useColorScheme } from "react-native";
import StripeProvider from "@/providers/StripeProvider";
import { colors } from "../colorScheme.json";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { initMercadoPago } from "@mercadopago/sdk-react";

export const unstable_settings = {
  initialRouteName: "index",
};

initMercadoPago("TEST-5375122b-d965-4d62-a92e-616c8be62cf6", {
  locale: "pt-BR",
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: colors.dark }
      : { ...MD3LightTheme, colors: colors.light };

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
        <PaperProvider theme={paperTheme}>
          <StripeProvider>
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
              <Stack.Screen
                name="checkout"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="new-event-page"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </StripeProvider>
        </PaperProvider>
      </GatewayProvider>
    </SessionProvider>
  );
}
