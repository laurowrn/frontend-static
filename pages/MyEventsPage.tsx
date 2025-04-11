import DefaultContainer from "@/components/containers/DefaultContainer";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Event } from "@/infrastructure/EventGateway";
import EventCard from "@/components/event/EventCard";
import { useGateway } from "@/context/GatewayContext";
import { useRouter } from "expo-router";

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[] | null>([
    {
      id: "",
      name: "",
      description: "",
      isPaid: false,
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      isPrivate: false,
      autoAccept: false,
      addressName: "",
      longitude: 0,
      latitude: 0,
      addressComplement: "",
    },
  ]);
  const [addresses, setAddresses] = useState<string[]>([""]);
  const { eventGateway } = useGateway();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) {
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
                console.warn(
                  "No address found for coordinates:",
                  event.latitude,
                  event.longitude
                );
                return "Endereço não encontrado";
              }
            }
            return "Coordenadas inválidas";
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

  return (
    <DefaultContainer>
      <FlatList
        style={{ width: "100%" }}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <EventCard
            event={{
              name: item.name,
              startDate: item.startDate,
              imageSource: require("../assets/event_image.png"),
            }}
            address={addresses[index]}
            onPress={() => router.push(`/events/${item.id}`)}
          />
        )}
      />
    </DefaultContainer>
  );
}
