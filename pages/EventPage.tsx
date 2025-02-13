import { useTheme } from "@/context/ThemeContext";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Fonts } from "@/constants/fonts";
import { useState } from "react";
import UserInfoForm from "@/components/form/UserInfoForm";
import FormButton from "@/components/form/FormButton";
import DefaultContainer from "@/components/containers/DefaultContainer";

export default function EventPage() {
  const { colors } = useTheme();
  type TicketSelectorStyle = {
    backgroundColor: string;
    iconColor: string;
    textColor: string;
    borderColor: string;
    iconName: keyof typeof Ionicons.glyphMap | undefined;
  };
  const blurredTicketSelectorStyle: TicketSelectorStyle = {
    backgroundColor: colors.surfaceVariant,
    iconColor: colors.onSurfaceVariant,
    textColor: colors.onSurfaceVariant,
    borderColor: "transparent",
    iconName: "ellipse-outline",
  };
  const focusedTicketSelectorStyle: TicketSelectorStyle = {
    backgroundColor: colors.tertiaryContainer,
    iconColor: colors.onTertiaryContainer,
    textColor: colors.onTertiaryContainer,
    borderColor: colors.onTertiaryContainer,
    iconName: "checkmark-circle",
  };
  const [maleTicketSelectorStyle, setMaleTicketSelectorStyle] = useState(
    blurredTicketSelectorStyle
  );
  const [femaleTicketSelectorStyle, setFemaleTicketSelectorStyle] = useState(
    blurredTicketSelectorStyle
  );
  const [isTicketTypeSelected, setIsTicketTypeSelected] = useState(false);
  const [ticketType, setTicketType] = useState<"male" | "female" | null>();
  const [isFormVisible, setIsFormVisible] = useState(false);
  function handleTicketTypeChange(type: "female" | "male") {
    if (type === "female") {
      setIsTicketTypeSelected(true);
      setFemaleTicketSelectorStyle(focusedTicketSelectorStyle);
      setMaleTicketSelectorStyle(blurredTicketSelectorStyle);
      setTicketType("female");
    } else {
      setIsTicketTypeSelected(true);
      setMaleTicketSelectorStyle(focusedTicketSelectorStyle);
      setFemaleTicketSelectorStyle(blurredTicketSelectorStyle);
      setTicketType("male");
    }
  }
  return (
    <DefaultContainer>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: horizontalScale(1500),
          rowGap: verticalScale(20),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            height: verticalScale(60),
          }}
        />
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../assets/event_image.png")}
            contentFit="cover"
            transition={1000}
          />
        </View>
        <Text
          style={{
            color: colors.onBackground,
            fontFamily: Fonts.bold,
            fontSize: fontSize(22),
            textAlign: "center",
            width: "100%",
          }}
        >
          Colmeia - Reflections Experience 22’03’25
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            columnGap: horizontalScale(3),
          }}
        >
          <Ionicons
            name="calendar"
            size={fontSize(36)}
            color={colors.primary}
            style={{ flex: 1, textAlign: "center" }}
          />
          <View style={{ flex: 7, rowGap: verticalScale(2) }}>
            <Text
              style={{
                color: colors.onBackground,
                fontFamily: Fonts.semiBold,
                fontSize: fontSize(16),
              }}
            >
              sábado, 22 de março
            </Text>
            <Text
              style={{
                color: colors.onBackground,
                fontFamily: Fonts.regular,
                fontSize: fontSize(16),
              }}
            >
              22:00 - 6:00
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            columnGap: horizontalScale(3),
          }}
        >
          <View style={{ flex: 1 }}>
            <Ionicons
              name="location"
              size={fontSize(30)}
              color={colors.primary}
              style={{
                textAlign: "center",
              }}
            />
          </View>
          <View
            style={{
              flex: 7,
              rowGap: verticalScale(2),
              flexDirection: "row",
              columnGap: horizontalScale(5),
            }}
          >
            <View style={{ width: "100%" }}>
              <Text
                style={{
                  color: colors.onBackground,
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(16),
                }}
              >
                Lounge GV
              </Text>
              <Text
                style={{
                  color: colors.onBackground,
                  fontFamily: Fonts.regular,
                  fontSize: fontSize(16),
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                R. Antônio Lopes Gonçalves Bastos, 1083 - Bairro Rio Pequeno,
                Camboriú - SC
              </Text>
            </View>
            <Feather
              name="arrow-up-right"
              size={26}
              style={{
                textAlign: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
              color={colors.primary}
            />
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              backgroundColor: colors.surfaceVariant,
              width: "100%",
              height: verticalScale(40),
              borderTopEndRadius: moderateScale(10),
              borderTopStartRadius: moderateScale(10),
              justifyContent: "center",
              padding: horizontalScale(10),
              borderWidth: moderateScale(1),
              borderColor: colors.surfaceVariant,
            }}
          >
            <Text
              style={{
                color: colors.onSurfaceVariant,
                fontFamily: Fonts.regular,
                fontSize: fontSize(16),
              }}
            >
              Obter ingressos
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.backdrop,
              width: "100%",
              borderBottomEndRadius: moderateScale(10),
              borderBottomStartRadius: moderateScale(10),
              borderWidth: moderateScale(1),
              borderColor: colors.surfaceVariant,
              padding: horizontalScale(10),
              rowGap: verticalScale(8),
            }}
          >
            <Text
              style={{
                color: colors.onBackground,
                fontFamily: Fonts.regular,
                fontSize: fontSize(16),
                flex: 1,
              }}
            >
              Bem-vindo! Por favor, escolha o tipo de ingresso desejado:
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: maleTicketSelectorStyle.backgroundColor,
                borderRadius: moderateScale(10),
                borderColor: maleTicketSelectorStyle.borderColor,
                borderWidth: moderateScale(1),
                paddingVertical: verticalScale(8),
                paddingHorizontal: moderateScale(5),
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                handleTicketTypeChange("male");
              }}
            >
              <View>
                <Ionicons
                  name={maleTicketSelectorStyle.iconName}
                  size={fontSize(20)}
                  color={maleTicketSelectorStyle.iconColor}
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: maleTicketSelectorStyle.textColor,
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(16),
                  }}
                >
                  MASCULINO - PRÉ-VENDA
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: maleTicketSelectorStyle.textColor,
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(15),
                  }}
                >
                  R$ 120,00
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                width: "100%",
                backgroundColor: femaleTicketSelectorStyle.backgroundColor,
                borderColor: femaleTicketSelectorStyle.borderColor,
                borderRadius: moderateScale(10),
                borderWidth: moderateScale(1),
                paddingVertical: verticalScale(8),
                paddingHorizontal: moderateScale(5),
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => {
                handleTicketTypeChange("female");
              }}
            >
              <View>
                <Ionicons
                  name={femaleTicketSelectorStyle.iconName}
                  size={fontSize(20)}
                  color={femaleTicketSelectorStyle.iconColor}
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: femaleTicketSelectorStyle.textColor,
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(16),
                  }}
                >
                  FEMININO - PRÉ-VENDA
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    color: femaleTicketSelectorStyle.textColor,
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(15),
                  }}
                >
                  R$ 80,00
                </Text>
              </View>
            </TouchableOpacity>
            {isTicketTypeSelected && !isFormVisible && (
              <View style={{ rowGap: verticalScale(10) }}>
                <View
                  style={{
                    width: "100%",
                    height: verticalScale(1),
                    backgroundColor: colors.surfaceVariant,
                  }}
                />
                <FormButton
                  title="Solicitar Participação"
                  backgroundColor={colors.primary}
                  textColor={colors.onPrimary}
                  onPress={() => {
                    setIsFormVisible(true);
                  }}
                />
              </View>
            )}
            {isFormVisible && <UserInfoForm ticketType={ticketType} />}
          </View>
        </View>
        <View style={{ width: "100%", rowGap: verticalScale(10) }}>
          <Text
            style={{
              color: colors.onBackground,
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            Sobre o evento
          </Text>
          <View
            style={{
              width: "100%",
              height: verticalScale(1),
              backgroundColor: colors.surfaceVariant,
            }}
          />
          <Text
            style={{
              color: colors.onBackground,
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(15),
              lineHeight: verticalScale(20),
            }}
          >
            Mesas e reservas: +55 98406-4466
            <br />
            <br />
            Você precisa ser aceito para fazer parte. Não existe venda direta de
            ingressos, e o valor só é debitado após a aprovação.
            <br />
            <br />A Colmeia é um evento de música eletrônica inovador que
            oferece uma experiência única para o público e artistas. Com um
            rigoroso processo de seleção, garante a participação de um público
            exclusivo e altamente engajado. O evento promove colaboração e
            criatividade, proporcionando novas sensações e momentos memoráveis,
            enquanto revitaliza a cena musical eletrônica e destaca sua casa
            como um centro de inovação e inclusão.
            <br />
            <br />
            Política de Cancelamento:
            <br />
            <br />O Código de Defesa do Consumidor (Artigo 49) prevê que, em até
            7 (sete) dias, o consumidor pode desistir da compra, desde que esse
            prazo não ultrapasse 48 (quarenta e oito) horas antes do evento. O
            reembolso é realizado via um processador de pagamentos online, pela
            mesma forma de pagamento utilizada na compra, descontada a taxa de
            conveniência (se houver), no prazo de até 45 (quarenta e cinco) dias
            após o cancelamento. No caso de compras com cartões de crédito, o
            valor será devolvido como crédito nas faturas seguintes.
            <br />
            Bem-vindo à experiência Colmeia!
          </Text>
        </View>
        <View
          style={{
            height: verticalScale(60),
          }}
        />
      </ScrollView>
    </DefaultContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: moderateScale(300),
    height: moderateScale(300),
    overflow: "hidden",
    borderRadius: moderateScale(10),
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
