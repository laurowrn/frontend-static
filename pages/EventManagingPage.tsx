import DefaultContainer from "@/components/containers/DefaultContainer";
import { verticalScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function EventManagingPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  return (
    <DefaultContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          rowGap: verticalScale(20),
        }}
      >
        <Button
          icon={"google-analytics"}
          style={{ width: "100%" }}
          mode="contained"
          onPress={() => {
            router.navigate(`./${eventId}/estatisticas`);
          }}
        >
          Estatísticas
        </Button>
        <Button
          icon={"check"}
          style={{ width: "100%" }}
          mode="contained"
          onPress={() => {
            router.navigate(`./${eventId}/aprovar`);
          }}
        >
          Aprovar solicitações
        </Button>
        <Button
          icon={"ticket-percent"}
          style={{ width: "100%" }}
          mode="contained"
          onPress={() => {
            router.navigate(`./${eventId}/gerar-cupom`);
          }}
        >
          Gerar cupom
        </Button>
        <Button
          icon={"qrcode-scan"}
          style={{ width: "100%" }}
          mode="contained"
          onPress={() => {
            router.navigate(`./${eventId}/validar`);
          }}
        >
          Validar ingressos
        </Button>
        {/* <Button icon={"form-select"} style={{ width: "100%" }} mode="contained">
          Editar evento
        </Button> */}
        <Button
          icon={"format-list-bulleted"}
          style={{ width: "100%" }}
          mode="contained"
          onPress={() => {
            router.navigate(`./${eventId}/lista-convidados`);
          }}
        >
          Ver lista de convidados
        </Button>
      </View>
    </DefaultContainer>
  );
}
