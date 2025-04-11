import { useEffect, useState } from "react";
import { useGateway } from "@/context/GatewayContext";
import { GetEventWithTicketPricingResponse } from "@/infrastructure/EventGateway";

export function useEventData(eventId: string) {
  const { eventGateway } = useGateway();

  const [event, setEvent] = useState<GetEventWithTicketPricingResponse | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const eventWithTicketType =
          await eventGateway.getEventWithTicketPricing(Number(eventId));
        if (!isMounted) return;
        setEvent(eventWithTicketType);

        if (
          !eventWithTicketType?.event.latitude ||
          !eventWithTicketType?.event.longitude
        ) {
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${eventWithTicketType.event.latitude}&lon=${eventWithTicketType.event.longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`
          );
          const result = await response.json();
          if (!isMounted) return;
          if (result?.address) {
            setAddress(
              `${result.address.road}, ${result.address.suburb}, ${result.address.city} - ${result.address.state}`
            );
          }
        } catch (error) {
          console.error("Error fetching address:", error);
          setIsError(true);
        }
      } catch (error: any) {
        console.error("Error fetching event:", error);
        if (!isMounted) return;
        setIsError(true);
        setLoading(false);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  return { event, address, isLoading, isError };
}
