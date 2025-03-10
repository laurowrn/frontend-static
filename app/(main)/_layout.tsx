import { ActivityIndicator, Text, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useSession } from "@/context/AuthContext";
import DefaultContainer from "@/components/containers/DefaultContainer";

export default function MainLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <DefaultContainer>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </DefaultContainer>
    );
  }

  if (session) {
    const decoded = jwtDecode(session);
    console.log(session);
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return <Redirect href="/login" />;
    }
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="validar"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="logout"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
