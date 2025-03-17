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
import * as Crypto from "expo-crypto";
import { BACKEND_BASE_URL, FRONTEND_BASE_URL } from "@/helpers/applicationUrl";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const { colors } = useTheme();
  const router = useRouter();
  const { signIn, session } = useSession();
  // const redirectUri = makeRedirectUri({ path: "/login/" });

  const handleLogin = async () => {
    const generateRandomState = async (): Promise<string> => {
      const randomBytes = await Crypto.getRandomBytesAsync(16);
      return Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    };

    const randomState = await generateRandomState();
    await WebBrowser.openAuthSessionAsync(
      `${BACKEND_BASE_URL}/public/login/google?state=${randomState}`,
      `${FRONTEND_BASE_URL}/login/`
    );

    fetch(`${BACKEND_BASE_URL}/public/login/verify`, {
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
