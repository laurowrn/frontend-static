import DefaultContainer from "@/components/containers/DefaultContainer";
import { Text, TouchableOpacity, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useSession } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";
import { useTheme } from "react-native-paper";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/fonts";
import {
  BACKEND_BASE_URL,
  FRONTEND_BASE_URL,
  GOOGLE_REDIRECT_URI,
} from "@/helpers/applicationUrl";
import { useEffect, useState } from "react";
import FormButton from "@/components/form/FormButton";
import GenericButton from "@/components/GenericButton";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { ActivityIndicator } from "react-native-paper";

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
      router.replace("/main");
    } catch (error: any) {
      setIsLoginLoading(false);
      router.push(`/error?message=${error.message}`);
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
            size={fontSize(100)}
            color={colors.primary}
          />
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(30),
              color: colors.onBackground,
              textAlign: "center",
            }}
          >
            Entre na sua conta
          </Text>
          <View style={{ height: verticalScale(120) }} />
          <GenericButton
            backgroundColor={colors.primary}
            textColor={colors.onPrimary}
            onPress={() => {
              setIsLoginLoading(true);
              promptAsync();
            }}
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <ActivityIndicator size="small" color={colors.onPrimary} />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  columnGap: horizontalScale(10),
                }}
              >
                <Ionicons
                  name="logo-google"
                  size={fontSize(24)}
                  color={colors.onPrimary}
                />
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    fontSize: fontSize(22),
                    color: colors.onPrimary,
                    textAlign: "center",
                  }}
                >
                  Login com Google
                </Text>
              </View>
            )}
          </GenericButton>
        </View>
      ) : (
        <Redirect href={"/(main)/main"} />
      )}
    </DefaultContainer>
  );
}
