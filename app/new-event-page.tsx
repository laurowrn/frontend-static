import DefaultContainer from "@/components/containers/DefaultContainer";
import { Button, useTheme, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { TicketPricing } from "@/infrastructure/EventGateway";
import TicketBuyingForm from "@/components/form/TicketBuyingForm";
import { View, StyleSheet } from "react-native";
import { verticalScale } from "@/helpers/responsiveScaling";
import EventPageHeader from "@/components/structure/EventPageHeader";
import EventPageDescription from "@/components/structure/EventPageDescription";
import EventPageFooter from "@/components/structure/EventPageFooter";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import { WebImageColors } from "react-native-image-colors/build/types";
import { LinearGradient } from "expo-linear-gradient";
import EventPageContainer from "@/components/structure/EventPageContainer";
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

  const [colorList, setColorList] = useState<string[]>([]);

  return (
    <EventPageContainer backgroundColor={colors.background}>
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
        <EventPageDescription
          description={`Mesas e reservas: +55 98406-4466

Você precisa ser aceito para fazer parte. Não existe venda direta de ingressos, e o valor só é debitado após a aprovação.

A Colmeia é um evento de música eletrônica inovador que oferece uma experiência única para o público e artistas. Com um rigoroso processo de seleção, garante a participação de um público exclusivo e altamente engajado. O evento promove colaboração e criatividade, proporcionando novas sensações e momentos memoráveis, enquanto revitaliza a cena musical eletrônica e destaca sua casa como um centro de inovação e inclusão.

Política de Cancelamento:

O Código de Defesa do Consumidor (Artigo 49) prevê que, em até 7 (sete) dias, o consumidor pode desistir da compra, desde que esse prazo não ultrapasse 48 (quarenta e oito) horas antes do evento. O reembolso é realizado via um processador de pagamentos online, pela mesma forma de pagamento utilizada na compra, descontada a taxa de conveniência (se houver), no prazo de até 45 (quarenta e cinco) dias após o cancelamento. No caso de compras com cartões de crédito, o valor será devolvido como crédito nas faturas seguintes.

Bem-vindo à experiência Colmeia!`}
        />
        <EventPageFooter />
      </View>
    </EventPageContainer>
  );
}
