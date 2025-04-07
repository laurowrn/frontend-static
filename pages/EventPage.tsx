import { ActivityIndicator, useTheme } from "react-native-paper";
import { useEffect, useState } from "react";
import { GetEventWithTicketPricingResponse } from "@/infrastructure/EventGateway";
import TicketBuyingForm from "@/components/form/TicketBuyingForm";
import { View } from "react-native";
import { verticalScale } from "@/helpers/responsiveScaling";
import EventPageHeader from "@/components/structure/EventPageHeader";
import EventPageDescription from "@/components/structure/EventPageDescription";
import EventPageFooter from "@/components/structure/EventPageFooter";
import EventPageContainer from "@/components/structure/EventPageContainer";
import { useGateway } from "@/context/GatewayContext";
import { useRouter } from "expo-router";

interface EventPageProps {
  eventId: string;
}

export default function EventPage({ eventId }: EventPageProps) {
  const { colors, dark } = useTheme();
  const { eventGateway } = useGateway();
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState<GetEventWithTicketPricingResponse>({
    event: {
      autoAccept: false,
      description: "",
      endDate: new Date(),
      startDate: new Date(),
      id: "",
      isPaid: false,
      isPrivate: true,
      location: "",
      name: "",
      addressName: "",
      addressComplement: "",
      longitude: 0,
      latitude: 0,
    },
    ticketPricings: [
      {
        id: 1,
        eventId: 1,
        ticketType: "Masculino",
        lot: 1,
        price: 0,
        maleCapacity: 0,
        femaleCapacity: 0,
      },
    ],
  });
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const eventWithTicketType =
          await eventGateway.getEventWithTicketPricing(Number(eventId));
        setEvent(eventWithTicketType);
      } catch (error: any) {
        router.push(`/error?message=${encodeURIComponent(error.message)}`);
      }
    })();
  }, []);

  useEffect(() => {
    if (event.event.latitude && event.event.longitude) {
      (async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.event.latitude}&lon=${event.event.longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`
          );
          const result = await response.json();
          if (result) {
            setAddress(
              `${result.address.road}, ${result.address.suburb}, ${result.address.city} - ${result.address.state}`
            );
            setLoading(false);
          } else {
            console.log("No address found for the given coordinates.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setLoading(false);
        }
      })();
    }
  }, [event.event.latitude, event.event.longitude]);

  const [colorList, setColorList] = useState<string[]>([]);

  return (
    <EventPageContainer backgroundColor={colors.background}>
      {isLoading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={{ alignItems: "center", rowGap: verticalScale(15) }}>
          <EventPageHeader
            eventTitle={event.event.name}
            eventImageUrl={require("../assets/event_image.png")}
            startDate={event.event.startDate}
            endDate={event.event.endDate}
            eventLocationName={event.event.addressName}
            eventAddress={address}
            eventLocationUrl={`https://www.google.com/maps/search/?api=1&query=${event.event.latitude},${event.event.longitude}`}
          />
          <TicketBuyingForm
            ticketTypes={[...event.ticketPricings].sort((a, b) => a.id - b.id)}
          />
          <EventPageDescription description={event.event.description} />
          <EventPageFooter />
        </View>
      )}
    </EventPageContainer>
  );
}
