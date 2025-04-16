import {
  ActivityIndicator,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import TicketBuyingForm from "@/components/form/TicketBuyingForm";
import { View } from "react-native";
import { verticalScale } from "@/helpers/responsiveScaling";
import EventPageHeader from "@/components/structure/EventPageHeader";
import EventPageDescription from "@/components/structure/EventPageDescription";
import EventPageContainer from "@/components/structure/EventPageContainer";
import { useRouter } from "expo-router";
import EventMap from "@/components/structure/EventMap.web";
import PublicEventPageAppBar from "@/components/structure/EventPageAppBar";
import { moderateScale, fontSize } from "@/helpers/responsiveScaling";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { useEventData } from "@/hooks/useEventData";
import { Appbar } from "react-native-paper";

interface EventPageProps {
  eventId: string;
}

export default function EventPage({ eventId }: EventPageProps) {
  const { colors } = useTheme();
  const { event, address, isLoading, isError } = useEventData(eventId);
  const router = useRouter();

  if (isError) {
    router.replace("/error?message=Falha em carregar informações do evento");
    return;
  }

  if (isLoading || !event) {
    return (
      <EventPageContainer backgroundColor={colors.background}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      </EventPageContainer>
    );
  }

  return (
    <EventPageContainer backgroundColor={colors.background}>
      <View style={{ alignItems: "center", rowGap: verticalScale(15) }}>
        <EventPageHeader
          eventTitle={event.event.name}
          eventImageUrl={require("../assets/event_image.png")}
          startDate={event.event.startDate}
          endDate={event.event.endDate}
          eventLocationName={event.event.addressName}
          eventAddress={address}
          eventLocationUrl={`https://www.google.com/maps/search/?api=1&query=${event.event.latitude},${event.event.longitude}`}
          eventId={eventId}
          appBar={
            <PublicEventPageAppBar
              eventId={eventId}
              left={
                <Appbar.BackAction
                  onPress={() => router.back()}
                  iconColor={colors.primary}
                />
              }
            />
          }
        />
        <TicketBuyingForm
          ticketTypes={[...event.ticketPricings].sort((a, b) => a.id - b.id)}
          eventId={eventId}
        />
        <EventPageDescription description={event.event.description} />
        <EventMap
          latitude={Number(event.event.latitude)}
          longitude={Number(event.event.longitude)}
        />
        <View
          style={{
            height: verticalScale(80),
          }}
        />
      </View>
    </EventPageContainer>
  );
}
