import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { FlatList, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Divider,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
  Dialog,
  Portal,
} from "react-native-paper";
import { Event } from "@/infrastructure/EventGateway";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useGateway } from "@/context/GatewayContext";
import { useEffect, useState } from "react";

import { type ErrorBoundaryProps } from "expo-router";
import LegalInformationFooter from "@/components/info/LegalInformationFooter";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const router = useRouter();
  return (
    <Portal>
      <Dialog visible={true} onDismiss={() => {}}>
        <Dialog.Title>Erro</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{error.message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              router.back();
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default function Index() {
  const { colors } = useTheme();
  const router = useRouter();
  const { eventGateway } = useGateway();
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
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<string[]>();

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
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TikkoIcons name="mark1" size={fontSize(60)} color={colors.primary} />
        <Button
          mode="contained"
          onPress={() => {
            router.navigate("/login");
          }}
        >
          Login
        </Button>
      </View>
      <View style={{ height: verticalScale(100) }} />
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
          <TouchableRipple
            style={{ width: "100%", marginBottom: verticalScale(10) }}
            onPress={() => {
              router.push(`/events/${item.id}`);
            }}
          >
            <Surface
              elevation={1}
              style={{
                width: "100%",
                borderRadius: moderateScale(10),
                padding: moderateScale(10),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: horizontalScale(10),
                }}
              >
                <View
                  style={{
                    width: moderateScale(100),
                    height: moderateScale(100),
                    overflow: "hidden",
                    borderRadius: moderateScale(10),
                  }}
                >
                  <Image
                    style={{ flex: 1, width: "100%" }}
                    source={require("../assets/event_image.png")}
                    contentFit="cover"
                    transition={1000}
                  />
                </View>
                <View style={{ rowGap: verticalScale(3), flex: 1 }}>
                  <Text
                    style={{ fontSize: fontSize(25), fontFamily: Fonts.bold }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: Fonts.bold,
                      color: colors.primary,
                    }}
                  >
                    {`${item.startDate.toLocaleDateString("pt-BR", {
                      weekday: "long",
                    })}, ${item.startDate.toLocaleDateString("pt-BR", {
                      dateStyle: "long",
                    })}`}
                  </Text>

                  <Text
                    style={{
                      fontSize: fontSize(14),
                      fontFamily: Fonts.bold,
                      flex: 1,
                    }}
                    numberOfLines={1}
                  >
                    {addresses && addresses[index]
                      ? addresses[index]
                      : "Endereço não encontrado"}
                  </Text>
                </View>
              </View>
            </Surface>
          </TouchableRipple>
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
