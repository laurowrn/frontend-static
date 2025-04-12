import DefaultContainer from "@/components/containers/DefaultContainer";
import { FlatList, View } from "react-native";
import EventCard from "@/components/event/EventCard";
import { useRouter } from "expo-router";
import { useAllEventsData } from "@/hooks/useAllEventsData";
import { useTheme, ActivityIndicator } from "react-native-paper";

export default function ExplorePage() {
  const { events, addresses = [], isLoading, isError } = useAllEventsData();
  const { colors } = useTheme();

  const router = useRouter();

  if (isError) {
    router.replace("/error?message=Falha em carregar informações do evento");
    return;
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
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <EventCard
            event={{
              name: item.name,
              startDate: item.startDate,
              imageSource: require("../assets/event_image.png"),
            }}
            address={addresses[index] || ""}
            onPress={() => router.navigate(`/events/${item.id}`)}
          />
        )}
      />
    </DefaultContainer>
  );
}
