import DefaultContainer from "@/components/containers/DefaultContainer";
import { Text, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useSession } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { Appbar, Button, useTheme } from "react-native-paper";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/fonts";
import {
  BACKEND_BASE_URL,
  GOOGLE_REDIRECT_URI,
} from "@/helpers/applicationUrl";
import { useEffect, useState } from "react";
import { TikkoIcons } from "@/hooks/useDefaultFonts";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { colors } = useTheme();
  const router = useRouter();
  const { signIn, session } = useSession();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const redirectUri = GOOGLE_REDIRECT_URI;
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri: redirectUri,
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || "",
      responseType: "code",
      scopes: ["openid", "profile", "email"],
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
      userInfoEndpoint: "https://openidconnect.googleapis.com/v1/userinfo",
    }
  );

  const exchangeCodeWithBackend = async (code: string) => {
    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/public/login/exchange`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
            redirectUri,
            codeVerifier: request?.codeVerifier,
          }),
        }
      );

      const data = await response.json();
      signIn(data.token);
      setIsLoginLoading(false);
      router.replace("/explore");
    } catch (error: any) {
      setIsLoginLoading(false);
      router.navigate(`/error?message=${error.message}`);
    }
  };

  useEffect(() => {
    (async function handleResult() {
      if (result) {
        if (result.type === "error") {
          router.push(
            `/error?message=${encodeURIComponent("Falha ao realizar login")}`
          );
          return;
        }
        if (result.type === "dismiss") {
          setIsLoginLoading(false);
          return;
        }
        if (result.type === "success" && result.params.code) {
          await exchangeCodeWithBackend(result.params.code);
        }
      }
    })();
  }, [result]);

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Checkout" />
      </Appbar.Header>
      <DefaultContainer>
        {!session ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TikkoIcons
              name="logo1"
              size={fontSize(80)}
              color={colors.primary}
            />
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: fontSize(25),
                color: colors.onBackground,
                textAlign: "center",
              }}
            >
              Entre na sua conta
            </Text>
            <View style={{ height: verticalScale(120) }} />
            <View style={{ width: "100%" }}>
              <Button
                mode="contained"
                onPress={() => {
                  setIsLoginLoading(true);
                  promptAsync();
                }}
                loading={isLoginLoading}
                disabled={isLoginLoading}
                icon={() => (
                  <Ionicons
                    name="logo-google"
                    size={fontSize(20)}
                    color={colors.onPrimary}
                    style={{ marginRight: horizontalScale(8) }}
                  />
                )}
              >
                Login com Google
              </Button>
            </View>
          </View>
        ) : (
          <Redirect href={"/explore"} />
        )}
      </DefaultContainer>
    </View>
  );
}
