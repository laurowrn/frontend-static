import { EventGatewayProvider } from "@/context/EventGatewayContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useDefaultFonts } from "@/hooks/useDefaultFonts";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

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
  let baseUrl: string = "";
  const appEnv = process.env.EXPO_PUBLIC_APP_ENV || "";
  if (appEnv === "DEV") {
    if (Platform.OS === "web") {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/android|iphone|ipad|ipod|mobile/i.test(userAgent)) {
        baseUrl = process.env.EXPO_PUBLIC_DEV_MOBILE_BACKEND_BASE_URL || "";
      } else {
        baseUrl = process.env.EXPO_PUBLIC_DEV_DESKTOP_BACKEND_BASE_URL || "";
      }
    }
  } else {
    baseUrl = process.env.EXPO_PUBLIC_BACKEND_BASE_URL || "";
  }

  console.log(baseUrl);

  return (
    <EventGatewayProvider baseUrl={baseUrl}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="error"
            options={{
              presentation: "transparentModal",
              animation: "fade",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="confirm"
            options={{
              presentation: "transparentModal",
              animation: "fade",
              headerShown: false,
            }}
          />
        </Stack>
      </ThemeProvider>
    </EventGatewayProvider>
  );
}
