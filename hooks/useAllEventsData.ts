import { useEffect, useState } from "react";
import { useGateway } from "@/context/GatewayContext";
import { Event } from "@/infrastructure/EventGateway";

export const useAllEventsData = () => {
  const { eventGateway } = useGateway();
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [addresses, setAddresses] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const collectedEvents = await eventGateway.getEvents();
        if (!isMounted) return;
        setEvents(collectedEvents);

        if (!collectedEvents || collectedEvents.length === 0) {
          setIsLoading(false);
          setAddresses([]);
          return;
        }

        try {
          const fetchedAddresses = await Promise.all(
            collectedEvents.map(async (event) => {
              if (event.latitude && event.longitude) {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.latitude}&lon=${event.longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`
                );
                const result = await response.json();
                if (result?.address) {
                  return `${event.addressName}, ${
                    result.address.city
                      ? result.address.city
                      : result.address.town
                  } - ${result.address.state}`;
                } else {
                  return "Endereço não encontrado";
                }
              }
              return "";
            })
          );
          if (!isMounted) return;
          setAddresses(fetchedAddresses);
        } catch (error) {
          console.error("Error fetching addresses:", error);
          if (!isMounted) return;
          setIsError(true);
        }
      } catch (error: any) {
        console.error("Error fetching events:", error);
        if (!isMounted) return;
        setIsError(true);
        setIsLoading(false);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [eventGateway]);

  return { events, addresses, isLoading, isError };
};
