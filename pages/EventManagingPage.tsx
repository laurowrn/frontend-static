import DefaultContainer from "@/components/containers/DefaultContainer";
import { verticalScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function EventManagingPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={router.back} />
        <Appbar.Content title="Gerenciar evento" />
      </Appbar.Header>
      <DefaultContainer>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            rowGap: verticalScale(20),
          }}
        >
          <Button style={{ width: "100%" }} mode="contained">
            Validar ingressos
          </Button>
          <Button style={{ width: "100%" }} mode="contained">
            Aprovar solicitações
          </Button>
          <Button style={{ width: "100%" }} mode="contained">
            Gerar cupom
          </Button>
          <Button style={{ width: "100%" }} mode="contained">
            Editar evento
          </Button>
        </View>
      </DefaultContainer>
    </View>
  );
}
