import DefaultContainer from "@/components/containers/DefaultContainer";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Event } from "@/infrastructure/EventGateway";
import EventCard from "@/components/event/EventCard";
import { useGateway } from "@/context/GatewayContext";
import { useRouter } from "expo-router";
import { useAllEventsData } from "@/hooks/useAllEventsData";

export default function MyEventsPage() {
  const { events, addresses, isLoading } = useAllEventsData();
  const router = useRouter();

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
            address={addresses && addresses[index] ? addresses[index] : ""}
            onPress={() => router.push(`/manage-event/${item.id}`)}
          />
        )}
      />
    </DefaultContainer>
  );
}
