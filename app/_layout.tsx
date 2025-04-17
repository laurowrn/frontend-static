import { GatewayProvider } from "@/context/GatewayContext";
import { TikkoIcons, useDefaultFonts } from "@/hooks/useDefaultFonts";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SessionProvider } from "@/context/AuthContext";
import { BACKEND_BASE_URL } from "@/helpers/applicationUrl";
import { useColorScheme } from "react-native";
import { colors } from "../colorScheme.json";
import {
  Appbar,
  Button,
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
} from "react-native-paper";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { fontSize, horizontalScale } from "@/helpers/responsiveScaling";
import getLanguageTag from "@/helpers/getLanguageTag";
import { Helmet, HelmetProvider } from "react-native-helmet-async";

export const unstable_settings = {
  initialRouteName: "index",
};

initMercadoPago(process.env.EXPO_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || "", {
  locale: getLanguageTag(),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

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
    <HelmetProvider>
      <Helmet>
        <meta
          property="og:image:secure_url"
          content="https://i.postimg.cc/K86YbZ64/3000x3000-Colmeia-Maram-Rosa-Save-The-Date.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:title" content="Colmeia" />
        <meta property="og:description" content="Bem-vindo à Colmeia" />
        <meta
          property="og:url"
          content="https://www.tikko.com.br/next-events/1/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Tikko" />
      </Helmet>
      <SessionProvider>
        <GatewayProvider baseUrl={BACKEND_BASE_URL}>
          <PaperProvider theme={paperTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="index"
                options={{
                  headerShown: true,
                  header: ({ navigation, options }) => (
                    <Appbar.Header
                      style={{ paddingHorizontal: horizontalScale(20) }}
                    >
                      <TikkoIcons
                        name="mark1"
                        size={fontSize(60)}
                        color={paperTheme.colors.primary}
                      />
                      <Appbar.Content title="" />
                      <Button
                        mode="contained"
                        onPress={() => {
                          router.navigate("/login");
                        }}
                      >
                        Login
                      </Button>
                    </Appbar.Header>
                  ),
                }}
              />
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
                name="(main)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="next-events"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </PaperProvider>
        </GatewayProvider>
      </SessionProvider>
    </HelmetProvider>
  );
}
