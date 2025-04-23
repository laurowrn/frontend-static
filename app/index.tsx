import { useAllEventsData } from "@/hooks/useAllEventsData"; // Adjust path as needed
import { FlatList, View } from "react-native";
import { ActivityIndicator, Button, Text, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import DefaultContainer from "@/components/containers/DefaultContainer";
import LegalInformationFooter from "@/components/info/LegalInformationFooter";
import EventCard from "@/components/event/EventCard";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { Fonts } from "@/constants/fonts";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import getEventImageUrl from "@/helpers/getEventImageUrl";
import generateSlug from "@/helpers/generateSlug";

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const { events, addresses, isLoading, isError } = useAllEventsData();

  if (isError) {
    router.replace("/error?message=Falha em carregar eventos");
    return;
  }

  if (isLoading || !events) {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <DefaultContainer>
      <View style={{ height: verticalScale(50) }} />
      <TikkoIcons name="logo1" size={fontSize(100)} color={colors.primary} />
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: Fonts.regular }}>
          Uma nova maneira de consumir e gerenciar eventos.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.surfaceVariant,
          marginVertical: verticalScale(10),
        }}
      />
      <Text
        style={{
          fontFamily: Fonts.bold,
          fontSize: fontSize(20),
        }}
      >
        Próximos eventos
      </Text>
      <View style={{ height: verticalScale(10) }} />
      <FlatList
        style={{ width: "100%" }}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <EventCard
            event={{
              name: item.name,
              startDate: item.startDate,
              imageSource: getEventImageUrl(Number(item.id)),
            }}
            address={addresses && addresses[index] ? addresses[index] : ""}
            onPress={() =>
              router.navigate(`/${generateSlug(item.name, item.id)}`)
            }
          />
        )}
      />
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: colors.surfaceVariant,
          marginVertical: verticalScale(10),
        }}
      />
      <LegalInformationFooter />
    </DefaultContainer>
  );
}
