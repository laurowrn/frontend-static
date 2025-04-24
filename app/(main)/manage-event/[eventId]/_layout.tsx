import { Fonts } from "@/constants/fonts";
import { UserEventsProvider } from "@/context/UserEventsContext";
import { Stack } from "expo-router";
import { Appbar } from "react-native-paper";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: ({ navigation, options }) => (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.pop()} />
            <Appbar.Content
              title={options.title || "Default Title"}
              titleStyle={{ fontFamily: Fonts.regular }}
            />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Gerenciar evento",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="validar"
        options={{
          headerShown: true,
          title: "Validar ingressos",
        }}
      />
      <Stack.Screen
        name="aprovar"
        options={{
          headerShown: true,
          title: "Aprovar solicitações",
        }}
      />
      <Stack.Screen
        name="estatisticas"
        options={{
          headerShown: true,
          title: "Estatísticas",
        }}
      />
      <Stack.Screen
        name="lista-convidados"
        options={{
          headerShown: true,
          title: "Lista de convidados",
        }}
      />
      <Stack.Screen
        name="gerar-cupom"
        options={{
          headerShown: true,
          title: "Gerar cupom",
        }}
      />
    </Stack>
  );
}
