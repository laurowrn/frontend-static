import DefaultContainer from "@/components/containers/DefaultContainer";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import { Surface, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { Fonts } from "@/constants/fonts";
import TicketTypeSelector from "@/components/form/TicketTypeSelector";

export default function NewForm() {
  const { colors } = useTheme();
  return (
    <DefaultContainer>
      <Surface
        style={{
          width: "100%",
          borderRadius: moderateScale(10),
          overflow: "hidden",
        }}
        elevation={2}
      >
        <Surface
          elevation={5}
          style={{
            padding: moderateScale(10),
          }}
        >
          <Text style={{ fontFamily: Fonts.semiBold, fontSize: fontSize(20) }}>
            Obter ingressos
          </Text>
        </Surface>
        <View style={{ padding: moderateScale(10) }}>
          <Text style={{ fontFamily: Fonts.regular, fontSize: fontSize(18) }}>
            Bem vindo! Por favor, escolha o tipo de ingresso desejado.
          </Text>
          <TicketTypeSelector
            style={{
              backgroundColor: "",
              borderColor: "transparent",
              textColor: "",
              iconColor: "",
              badgeBackgroundColor: undefined,
              badgeTextcolor: undefined,
            }}
            ticketName={"Camarote 1"}
            ticketPrice={"15.000,00"}
            iconName={"ellipse-outline"}
            onPress={() => {}}
          />
        </View>
      </Surface>
    </DefaultContainer>
  );
}
