import DefaultContainer from "@/components/containers/DefaultContainer";
import { useUserEventsContext } from "@/context/UserEventsContext";
import { verticalScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Appbar, Button } from "react-native-paper";

export default function EventManagingPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { getEventById } = useUserEventsContext();
  const event = getEventById(eventId);

  // Define role hierarchy for privilege checks
  const hasValidatorOrHigherPrivilege = [
    "Validator",
    "Manager",
    "Host",
  ].includes(event?.role ?? "Guest");
  const hasManagerOrHigherPrivilege = ["Manager", "Host"].includes(
    event?.role ?? "Guest"
  );
  const isHost = event?.role === "Host";

  return (
    <DefaultContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          rowGap: verticalScale(20),
        }}
      >
        {hasManagerOrHigherPrivilege && (
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
        )}
        {hasManagerOrHigherPrivilege && (
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
        )}
        {isHost && (
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
        )}
        {hasValidatorOrHigherPrivilege && (
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
        )}
        {hasValidatorOrHigherPrivilege && (
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
        )}
      </View>
    </DefaultContainer>
  );
}
