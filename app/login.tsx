import DefaultContainer from "@/components/containers/DefaultContainer";
import { Text, TouchableOpacity, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useSession } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/fonts";
import { BACKEND_BASE_URL, FRONTEND_BASE_URL } from "@/helpers/applicationUrl";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();
const redirectUri = `${FRONTEND_BASE_URL}/login/`;

export default function Login() {
  const { colors } = useTheme();
  const router = useRouter();
  const { signIn, session } = useSession();

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
      router.replace("/(main)/validar");
    } catch (error) {
      console.error("Token exchange error:", error);
    }
  };

  useEffect(() => {
    (async function handleResult() {
      if (result) {
        if (result.type === "error") {
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
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 20, width: "100%" }}
          onPress={() => promptAsync()}
        >
          <Text style={{ color: "white", textAlign: "center", fontSize: 30 }}>
            Login with Google
          </Text>
        </TouchableOpacity>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            rowGap: verticalScale(15),
          }}
        >
          <Text
            style={{
              color: colors.onBackground,
              fontFamily: Fonts.extraBold,
              fontSize: fontSize(20),
            }}
          >
            Você já está logado
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: moderateScale(10),
              borderRadius: moderateScale(10),
              flexDirection: "row",
              columnGap: horizontalScale(5),
            }}
            onPress={() => {
              router.replace("/(main)");
            }}
          >
            <Text
              style={{
                color: colors.onPrimary,
                fontFamily: Fonts.extraBold,
                fontSize: fontSize(15),
                alignContent: "center",
              }}
            >
              Vá para o aplicativo
            </Text>
            <Ionicons size={fontSize(15)} name="arrow-forward" />
          </TouchableOpacity>
        </View>
      )}
    </DefaultContainer>
  );
}
