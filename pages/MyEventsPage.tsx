import DefaultContainer from "@/components/containers/DefaultContainer";
import { FlatList, View } from "react-native";
import EventCard from "@/components/event/EventCard";
import { useRouter } from "expo-router";
import { useAllEventsData } from "@/hooks/useAllEventsData";
import { ActivityIndicator, useTheme } from "react-native-paper";
import getEventImageUrl from "@/helpers/getEventImageUrl";
import { useUserEventsData } from "@/hooks/useUserEventsData";

export default function MyEventsPage() {
  const { events, addresses = [], isLoading, isError } = useUserEventsData();
  const { colors } = useTheme();
  const router = useRouter();

  if (isError) {
    router.replace("/error?message=Falha em carregar informações do evento");
    return null;
  }

  if (isLoading || !events) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <DefaultContainer>
      <FlatList
        style={{ width: "100%" }}
        data={events}
        keyExtractor={(item) => item.event.id}
        renderItem={({ item, index }) => (
          <EventCard
            event={{
              name: item.event.name,
              startDate: item.event.startDate,
              imageSource: getEventImageUrl(Number(item.event.id)).local,
            }}
            address={addresses && addresses[index] ? addresses[index] : ""}
            onPress={() => {
              if (item.role === "Guest") {
                router.navigate(`/events/${item.event.id}`);
                return;
              }
              router.push(`/manage-event/${item.event.id}`);
            }}
          />
        )}
      />
    </DefaultContainer>
  );
}
