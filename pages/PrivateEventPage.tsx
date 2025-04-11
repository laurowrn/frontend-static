import { ActivityIndicator, useTheme, IconButton } from "react-native-paper";
import TicketBuyingForm from "@/components/form/TicketBuyingForm";
import { View } from "react-native";
import { verticalScale } from "@/helpers/responsiveScaling";
import EventPageHeader from "@/components/structure/EventPageHeader";
import EventPageDescription from "@/components/structure/EventPageDescription";
import EventPageContainer from "@/components/structure/EventPageContainer";
import { useRouter } from "expo-router";
import EventMap from "@/components/structure/EventMap.web";
import PublicEventPageAppBar from "@/components/structure/EventPageAppBar";
import { useEventData } from "@/hooks/useEventData";

interface PrivateEventPageProps {
  eventId: string;
}

export default function PrivateEventPage({ eventId }: PrivateEventPageProps) {
  const { colors } = useTheme();
  const { event, address, isLoading } = useEventData(eventId);
  const router = useRouter();

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
                <IconButton
                  icon={"arrow-left"}
                  onPress={() => {
                    router.back();
                  }}
                />
              }
            />
          }
        />
        <TicketBuyingForm
          ticketTypes={[...event.ticketPricings].sort((a, b) => a.id - b.id)}
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
