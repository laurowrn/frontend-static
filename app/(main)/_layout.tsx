import { ActivityIndicator, Text, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useSession } from "@/context/AuthContext";
import DefaultContainer from "@/components/containers/DefaultContainer";

export default function MainLayout() {
  const { session, isLoading, signOut } = useSession();

  if (isLoading) {
    return (
      <DefaultContainer>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator />
        </View>
      </DefaultContainer>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  if (session) {
    const decoded = jwtDecode<{ exp?: number }>(session);

    if (decoded.exp && Date.now() / 1000 >= decoded.exp) {
      signOut();
      return <Redirect href="/login" />;
    }
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="logout"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
