import DefaultContainer from "@/components/containers/DefaultContainer";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect, useState, version } from "react";
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

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { colors } = useTheme();
  const router = useRouter();
  const { signIn, session } = useSession();
  const redirectUri = makeRedirectUri({ path: "/login" });
  const [state, setState] = useState<string | null>(null);

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

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "your-actual-google-client-id",
      redirectUri: redirectUri,
      scopes: ["openid", "profile", "email"],
      extraParams: {
        redirect_uri: redirectUri,
      },
      usePKCE: true,
    },
    {
      authorizationEndpoint: `${baseUrl}/public/login/google`,
    }
  );

  useEffect(() => {
    if (request) {
      setState(request.state); // Store the state from the request
    }
  }, [request]);

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      const receivedState = params.state;

      fetch(`${baseUrl}/public/login/verify`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            router.push(
              `/error?message=${encodeURIComponent(
                "Não foi possível verificar o seu usuário"
              )}`
            );
          }
        })
        .then((data) => {
          const token = data.token;
          if (token) {
            signIn(token);
            router.replace("/(main)");
          }
        })
        .catch((err) =>
          router.push(
            `/error?message=${encodeURIComponent(
              "Não foi possível verificar o seu usuário: " + err
            )}`
          )
        );
    } else if (response?.type === "error") {
      router.push(
        `/error?message=${encodeURIComponent(
          "Não foi possível realizar o login"
        )}`
      );
    }
  }, [response, signIn, state]);

  const handleLogin = async () => {
    if (request) {
      await promptAsync();
    }
  };

  return (
    <DefaultContainer>
      {!session ? (
        <TouchableOpacity
          style={{ backgroundColor: "blue", padding: 20, width: "100%" }}
          onPress={handleLogin}
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
