import { useEffect, useState } from "react";
import { useGateway } from "@/context/GatewayContext";
import { GetEventWithTicketPricingResponse } from "@/infrastructure/EventGateway";
import { useRouter } from "expo-router";

export function useEventData(eventId: string) {
  const { eventGateway } = useGateway();
  const router = useRouter();

  const [event, setEvent] = useState<GetEventWithTicketPricingResponse | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const eventWithTicketType =
          await eventGateway.getEventWithTicketPricing(Number(eventId));
        setEvent(eventWithTicketType);
      } catch (error: any) {
        console.error("Error fetching event:", error);
        router.navigate(`/error?message=${encodeURIComponent(error.message)}`);
        setLoading(false);
      }
    })();
  }, [eventId]);

  useEffect(() => {
    if (!event?.event.latitude || !event?.event.longitude) return;

    (async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.event.latitude}&lon=${event.event.longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`
        );
        const result = await response.json();
        if (result?.address) {
          setAddress(
            `${result.address.road}, ${result.address.suburb}, ${result.address.city} - ${result.address.state}`
          );
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [event]);

  return { event, address, isLoading };
}
