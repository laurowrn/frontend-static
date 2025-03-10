import DefaultContainer from "@/components/containers/DefaultContainer";
import { Platform, Text, TouchableOpacity } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useSession } from "@/context/AuthContext"; // Adjust the import path
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  const router = useRouter();
  const { signIn, session } = useSession();
  const redirectUri = makeRedirectUri();

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
    },
    {
      authorizationEndpoint: `${baseUrl}/public/login/google`,
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { params } = response;
      const token = params.token;
      signIn(token);
      router.replace("/(main)/validar");
    } else if (response?.type === "error") {
    }
  }, [response, signIn]);

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
        <Text style={{ color: "black", marginTop: 20 }}>
          Logged in! Session token: {session}
        </Text>
      )}
    </DefaultContainer>
  );
}
