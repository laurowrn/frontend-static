import DefaultContainer from "@/components/containers/DefaultContainer";
import {
  useTheme,
  Text,
  TouchableRipple,
  Icon,
  IconButton,
} from "react-native-paper";
import { useState } from "react";
import { TicketPricing } from "@/infrastructure/EventGateway";
import TicketBuyingForm from "@/components/form/TicketBuyingForm";
import { View } from "react-native";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { Image } from "expo-image";
import { Fonts } from "@/constants/fonts";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import EventPageHeader from "@/components/structure/EventPageHeader";
export default function NewEventPage() {
  const { colors, dark } = useTheme();
  const [event, setEvent] = useState<{
    event: {
      startDate: Date;
      endDate: Date;
      location: string;
    };
  }>({
    event: {
      startDate: new Date(),
      endDate: new Date(),
      location: "Rua 05505, Bairo ABCBD,\nNúmero 4234",
    },
  });

  const [ticketTypes, setTicketTypes] = useState<TicketPricing[]>([
    {
      id: 1,
      eventId: 1,
      ticketType: "Masculino",
      lot: 1,
      price: 20000,
      maleCapacity: 0,
      femaleCapacity: 0,
    },
    {
      id: 2,
      eventId: 1,
      ticketType: "Feminino",
      lot: 1,
      price: 15000,
      maleCapacity: 0,
      femaleCapacity: 1,
    },
  ]);

  return (
    <DefaultContainer backgroundColor={colors.background}>
      <View style={{ alignItems: "center", rowGap: verticalScale(15) }}>
        <EventPageHeader
          eventTitle={"Colmeia - Reflections Experience 22’03’25"}
          eventImageUrl={require("../assets/event_image.png")}
          startDate={new Date()}
          endDate={new Date()}
          eventLocationName={"Lounge GV"}
          eventAddress={
            "Rua 05505, Bairo ABCBD, Número 4234, Balneário Camboriú - SC"
          }
          eventLocationUrl={"https://maps.app.goo.gl/gX3NzN7wEgR5Q1M18"}
        />
        <TicketBuyingForm ticketTypes={ticketTypes} />
      </View>
    </DefaultContainer>
  );
}
