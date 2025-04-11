import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useGateway } from "@/context/GatewayContext";
import { Event } from "@/infrastructure/EventGateway";

export const useAllEventsData = () => {
  const router = useRouter();
  const { eventGateway } = useGateway();
  const [events, setEvents] = useState<Event[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        const collectedEvents = await eventGateway.getEvents();
        setEvents(collectedEvents);
      } catch (error: any) {
        console.error("Error fetching event:", error);
        router.navigate(`/error?message=${encodeURIComponent(error.message)}`);
        setIsLoading(false);
      }
    })();
  }, [eventGateway, router]);

  useEffect(() => {
    if (!events || events.length === 0) {
      setIsLoading(false);
      return;
    }

    (async () => {
      try {
        const fetchedAddresses = await Promise.all(
          events.map(async (event) => {
            if (event.latitude && event.longitude) {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${event.latitude}&lon=${event.longitude}&zoom=18&addressdetails=1&accept-language=pt-BR`
              );
              const result = await response.json();
              if (result?.address) {
                return `${event.addressName}, ${result.address.city} - ${result.address.state}`;
              } else {
                return "Endereço não encontrado";
              }
            }
            return "";
          })
        );
        setAddresses(fetchedAddresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [events]);

  return { events, addresses, isLoading };
};
