import { useTheme } from "@/context/ThemeContext";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Pressable,
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
import { useEffect, useState } from "react";
import UserInfoForm, { FormInputConfig } from "@/components/form/UserInfoForm";
import FormButton from "@/components/form/FormButton";
import DefaultContainer from "@/components/containers/DefaultContainer";
import * as WebBrowser from "expo-web-browser";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import TicketTypeSelector, {
  ListItem,
} from "@/components/form/TicketTypeSelector";
import { useEventGateway } from "@/context/EventGatewayContext";
import { ExternalPathString, useRouter } from "expo-router";
import Footer from "@/components/structure/Footer";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  AGE_MAX_LENGTH,
  CPF_MAX_LENGTH,
  CUPOM_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  INSTAGRA_MAX_LENGTH,
  MOBILE_NUMBER_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "@/constants/validation";
import {
  validateAge,
  validateBirthday,
  validateCpf,
  validateEmail,
  validateInstagram,
  validateMobileNumber,
  validateName,
} from "@/helpers/validators";
import { TicketPricing } from "@/infrastructure/EventGateway";

export default function EventPage() {
  const { colors, theme } = useTheme();
  const router = useRouter();
  const eventGateway = useEventGateway();
  type TicketSelectorStyle = {
    backgroundColor: string;
    iconColor: string;
    textColor: string;
    borderColor: string;
    iconName: keyof typeof Ionicons.glyphMap | undefined;
    approvalBackgroundColor: string;
    approvalTextColor: string;
  };
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] =
    useState(false);
  const [isConfirmationChecked, setIsConfirmationChecked] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [ticketTypes, setTicketTypes] = useState<TicketPricing[]>([
    {
      id: 1,
      eventId: 1,
      ticketType: "Masculino",
      lot: 1,
      price: 20000,
      maleCapacity: 7,
      femaleCapacity: 7,
    },
    {
      id: 2,
      eventId: 1,
      ticketType: "Feminino",
      lot: 1,
      price: 20000,
      maleCapacity: 7,
      femaleCapacity: 7,
    },
  ]);
  const [ticketType, setTicketType] = useState<string>("");
  const [isTicketTypeSelected, setIsTicketTypeSelected] = useState(false);
  const ticketTypeStyles: TicketSelectorStyle[] = [
    {
      backgroundColor: colors.surfaceVariant,
      iconColor: colors.onSurfaceVariant,
      textColor: colors.onSurfaceVariant,
      borderColor: "transparent",
      iconName: "ellipse-outline",
      approvalBackgroundColor: colors.elevation.level5,
      approvalTextColor: colors.onSurfaceVariant,
    },
    {
      backgroundColor: colors.primaryContainer,
      iconColor: colors.onPrimaryContainer,
      textColor: colors.onPrimaryContainer,
      borderColor: colors.onPrimaryContainer,
      iconName: "checkmark-circle",
      approvalBackgroundColor: colors.primary,
      approvalTextColor: colors.onPrimary,
    },
  ];

  const [ticketSelectorStyles, setTicketSelectorStyles] = useState(
    Array(ticketTypes.length).fill(ticketTypeStyles[0])
  );

  function handleTicketTypeChange(index: number) {
    const newStyles = ticketSelectorStyles.map((style, i) =>
      i === index ? ticketTypeStyles[1] : ticketTypeStyles[0]
    );
    setTicketSelectorStyles(newStyles);
    setIsTicketTypeSelected(true);
    setTicketType(ticketTypes[index].id.toString());
  }

  const [loading, setLoading] = useState(true);

  const [isSubmitButtonDisabled, setIsSubmitButtondisabled] = useState(true);
  const formInputs: FormInputConfig[] = [
    {
      type: "text-input",
      name: "name",
      placeholder: "Nome",
      validator: validateName,
      maxLength: NAME_MAX_LENGTH,
      iconName: "person",
      inputMode: "text",
      autoCapitalize: "words",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: true,
    },
    {
      type: "text-input",
      name: "email",
      placeholder: "E-mail",
      validator: validateEmail,
      iconName: "mail",
      maxLength: EMAIL_MAX_LENGTH,
      inputMode: "email",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "text-input",
      name: "confirm-email",
      placeholder: "Confirme seu e-mail",
      matches: "email",
      iconName: "mail",
      maxLength: EMAIL_MAX_LENGTH,
      inputMode: "email",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "form-picker-input-text",
      name: "mobile-number",
      placeholder: "Telefone",
      validator: validateMobileNumber,
      maxLength: MOBILE_NUMBER_MAX_LENGTH,
      iconName: "call",
      inputMode: "text",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "form-picker-input-text",
      name: "confirm-mobile-number",
      placeholder: "Confirme seu telefone",
      matches: "mobile-number",
      maxLength: MOBILE_NUMBER_MAX_LENGTH,
      iconName: "call",
      inputMode: "text",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "text-input",
      name: "identification-number",
      placeholder: "CPF",
      validator: validateCpf,
      maxLength: CPF_MAX_LENGTH,
      iconName: "person",
      inputMode: "text",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "text-input",
      name: "instagram",
      placeholder: "Instagram",
      validator: validateInstagram,
      maxLength: INSTAGRA_MAX_LENGTH,
      iconName: "logo-instagram",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "birthday-picker",
      name: "birthday",
      placeholder: "Data de nascimento",
      validator: validateBirthday,
      iconName: "calendar",
    },
    {
      type: "checkbox",
      name: "coupon",
      placeholder: "Cupom",
      iconName: "wallet",
      maxLength: CUPOM_MAX_LENGTH,
      inputMode: "email",
      autoCapitalize: "none",
      autoComplete: "off",
      autoCorrect: false,
      autoFocus: false,
    },
    {
      type: "submit-button",
      name: "buy",
      title: "Comprar",
      disabled: isSubmitButtonDisabled,
      submit: async () => {
        // router.push(
        //   `/confirm?email=${formState["email"].value}&name=${formState["name"].value}&mobileNumber=${formState["mobile-number"].value}&identificationNumber=${formState["identification-number"].value}&ticketType=${ticketType}&birthday=${birthday}&instagram=${formState["instagram"].value}&coupon=${formState["coupon"].value}`
        // );
        setIsConfirmationPopupVisible(true);
      },
    },
  ];

  const listItems: ListItem[] = [
    {
      id: "1",
      title: "Limite de ingressos masculinos",
      subtitle: "Quantidade limite de ingressos masculinos",
      hasBottomDivider: true,
      quantity: "20",
    },
    {
      id: "2",
      title: "Limite de ingressos femininos",
      subtitle: "Quantidade limite de ingressos femininos",
      hasBottomDivider: true,
      quantity: "20",
    },
    {
      id: "3",
      title: "Preço",
      subtitle:
        "Valor total do produto R$ 15.000,00\nBônus de R$ 7.500,00 em consumo",
      quantity: "R$ 15.000,00",
    },
  ];

  const [formState, setFormState] = useState(
    formInputs.reduce((acc, input) => {
      acc[input.name] = {
        value: "",
        isValid: true,
        errorMessage: "",
        isFocused: false,
      };
      return acc;
    }, {} as Record<string, { value: string; isValid: boolean; errorMessage: string; isFocused: boolean }>)
  );

  useEffect(() => {
    (async () => {
      try {
        const eventWithTicketType =
          await eventGateway.getEventWithTicketPricing(1);
        const ticketPricings: TicketPricing[] =
          eventWithTicketType.ticketPricings.map((ticket) => ({
            ...ticket,
            maleCapacity: ticket.maleCapacity ?? 0,
            femaleCapacity: ticket.femaleCapacity ?? 0,
          }));
        setTicketTypes(ticketPricings);
        console.log(ticketPricings);
      } catch (error) {
        router.push("/error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    setTicketSelectorStyles(
      Array(ticketTypes.length).fill(ticketTypeStyles[0])
    );
  }, [ticketTypes]);

  if (loading) {
    return (
      <DefaultContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </DefaultContainer>
    );
  } else {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        {isConfirmationPopupVisible && (
          <Animated.View
            entering={FadeIn}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#000000d0",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
            }}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setIsConfirmationPopupVisible(false)}
            />
            <Animated.View
              entering={FadeInDown}
              style={{
                width: "85%",
                maxWidth: horizontalScale(1000),
                paddingVertical: verticalScale(20),
                paddingHorizontal: horizontalScale(20),
                borderRadius: moderateScale(10),
                borderWidth: moderateScale(0.5),
                borderColor: colors.onBackground,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.background,
                rowGap: verticalScale(30),
              }}
            >
              <View
                style={{
                  rowGap: verticalScale(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(16),
                    textAlign: "justify",
                    color: colors.onBackground,
                  }}
                >
                  Ao completar a compra, você deverá esperar a confirmação do
                  organizador do evento. Após a confirmação, o seu ingresso
                  chegará por WhatsApp.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    WebBrowser.openBrowserAsync(
                      "https://api.whatsapp.com/send?phone=5547997689918&text=Ol%C3%A1%2C%20eu%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                    );
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: Fonts.semiBold,
                      fontSize: fontSize(16),
                    }}
                  >
                    Qualquer dúvida fale conosco.
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: horizontalScale(10),
                    paddingVertical: verticalScale(20),
                    width: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      setIsConfirmationChecked(!isConfirmationChecked)
                    }
                  >
                    <Ionicons
                      key={isConfirmationChecked ? "checked" : "unchecked"}
                      name={
                        isConfirmationChecked
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={fontSize(20)}
                      style={{
                        textAlign: "center",
                        color: isConfirmationChecked
                          ? colors.primary
                          : colors.onSurface,
                      }}
                    />
                  </TouchableOpacity>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        rowGap: verticalScale(5),
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          color: colors.onSurface,
                          fontFamily: Fonts.semiBold,
                          fontSize: fontSize(13),
                        }}
                      >
                        Concordo com a{" "}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: colors.primary,
                          fontFamily: Fonts.black,
                          fontSize: fontSize(13),
                        }}
                        onPress={() => router.push("/politica-privacidade")}
                      >
                        Política de Privacidade{" "}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: colors.onSurface,
                          fontFamily: Fonts.semiBold,
                          fontSize: fontSize(13),
                        }}
                      >
                        e os{" "}
                      </Text>
                      <Text
                        style={{
                          textAlign: "left",
                          color: colors.primary,
                          fontFamily: Fonts.black,
                          fontSize: fontSize(13),
                        }}
                        onPress={() => router.push("/termos-e-condicoes")}
                      >
                        Termos e Condições.
                      </Text>
                    </View>
                  </View>
                </View>
                <Animated.View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.error,
                      paddingVertical: verticalScale(12),
                      paddingHorizontal: horizontalScale(15),
                      borderWidth: moderateScale(0.5),
                      borderColor: colors.onError,
                      borderRadius: moderateScale(10),
                      flex: 2,
                    }}
                    onPress={() => setIsConfirmationPopupVisible(false)}
                  >
                    <Text
                      style={{
                        fontFamily: Fonts.bold,
                        fontSize: fontSize(16),
                        color: colors.onError,
                        textAlign: "center",
                      }}
                    >
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                  <View style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={{
                      backgroundColor: isConfirmationChecked
                        ? colors.primary
                        : colors.surfaceDisabled,
                      paddingVertical: verticalScale(12),
                      paddingHorizontal: horizontalScale(15),
                      borderRadius: moderateScale(10),
                      flex: 2,
                      opacity: isCheckoutLoading ? 0.7 : 1,
                    }}
                    onPress={async () => {
                      if (isCheckoutLoading) return;
                      setIsCheckoutLoading(true);

                      let registerAndJoinData;
                      function convertDate(dateString: string): string {
                        const [day, month, year] = dateString.split("/");
                        return `${year}-${month}-${day}T00:00:00Z`;
                      }

                      const formattedBirthday = convertDate(
                        formState["birthday"].value
                      );
                      try {
                        registerAndJoinData =
                          await eventGateway.registerAndJoin(
                            {
                              email: formState["email"].value,
                              username: formState["name"].value,
                              gender: ticketType,
                              birthday: formattedBirthday,
                              mobileNumber: formState["mobile-number"].value,
                              instagram: formState["instagram"].value,
                              identificationNumber:
                                formState["identification-number"].value,
                            },
                            1,
                            Number(ticketType),
                            formState["coupon"].value!
                          );
                        if (registerAndJoinData.paymentURL) {
                          router.push(
                            registerAndJoinData.paymentURL as ExternalPathString
                          );
                        } else {
                          router.replace("/success");
                        }
                      } catch (error) {
                        router.push("/error");
                      } finally {
                        setIsCheckoutLoading(false);
                      }
                    }}
                    disabled={!isConfirmationChecked || isCheckoutLoading}
                  >
                    {isCheckoutLoading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.onPrimary}
                      />
                    ) : (
                      <Text
                        style={{
                          fontFamily: Fonts.bold,
                          fontSize: fontSize(16),
                          color: isConfirmationChecked
                            ? colors.onPrimary
                            : colors.onSurfaceDisabled,
                          textAlign: "center",
                        }}
                      >
                        Continuar
                      </Text>
                    )}
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>
          </Animated.View>
        )}
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
            <View style={{ height: verticalScale(5) }} />
            <TikkoIcons
              name="logo1"
              size={fontSize(40)}
              color={theme === "dark" ? colors.onBackground : colors.primary}
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
                    paddingBottom: verticalScale(5),
                  }}
                >
                  sábado, 22 de março
                </Text>
                <Text
                  style={{
                    color: colors.onBackground,
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(14),
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
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    columnGap: horizontalScale(10),
                  }}
                >
                  <View style={{ rowGap: verticalScale(4) }}>
                    <Text
                      style={{
                        color: colors.onBackground,
                        fontFamily: Fonts.semiBold,
                        fontSize: fontSize(16),
                        paddingBottom: verticalScale(5),
                      }}
                    >
                      Lounge GV
                    </Text>
                    <Text
                      style={{
                        color: colors.onBackground,
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(14),
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      R. Antônio Lopes Gonçalves Bastos, 1083
                    </Text>
                    <Text
                      style={{
                        color: colors.onBackground,
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(14),
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      Bairro Rio Pequeno
                    </Text>
                    <Text
                      style={{
                        color: colors.onBackground,
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(14),
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      Camboriú - SC
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                    onPress={() => {
                      WebBrowser.openBrowserAsync(
                        "https://maps.app.goo.gl/gX3NzN7wEgR5Q1M18"
                      );
                    }}
                  >
                    <Feather
                      name="arrow-up-right"
                      size={fontSize(32)}
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                      color={colors.primary}
                    />
                  </TouchableOpacity>
                </View>
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
                  shadowColor: "#000",
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  elevation: 1,
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
                  backgroundColor: colors.surface,
                  width: "100%",
                  borderBottomEndRadius: moderateScale(10),
                  borderBottomStartRadius: moderateScale(10),
                  borderWidth: moderateScale(1),
                  borderColor: colors.surfaceVariant,
                  padding: horizontalScale(10),
                  rowGap: verticalScale(8),
                  shadowColor: "#000",
                  shadowOpacity: 0.4,
                  shadowRadius: 2,
                  elevation: 1,
                }}
              >
                <Text
                  style={{
                    color: colors.onSurface,
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(16),
                    flex: 1,
                  }}
                >
                  Bem-vindo! Por favor, escolha o tipo de ingresso desejado:
                </Text>
                <FlatList
                  data={ticketTypes}
                  keyExtractor={(ticket) => ticket.id.toString()}
                  renderItem={({ item, index }) => (
                    // <TicketTypeSelector
                    //   style={{
                    //     backgroundColor:
                    //       ticketSelectorStyles[index].backgroundColor,
                    //     borderColor: ticketSelectorStyles[index].borderColor,
                    //     textColor: ticketSelectorStyles[index].textColor,
                    //     iconColor: ticketSelectorStyles[index].iconColor,
                    //     badgeBackgroundColor:
                    //       ticketSelectorStyles[index].approvalBackgroundColor,
                    //     badgeTextcolor:
                    //       ticketSelectorStyles[index].approvalTextColor,
                    //   }}
                    //   hasBadge={true}
                    //   badgeText="20 pessoas"
                    //   ticketName={`${item.ticketType.toUpperCase()} - ${
                    //     item.lot == 1 ? "PRÉ-VENDA" : `LOTE ${item.lot}`
                    //   }`}
                    //   ticketPrice={
                    //     item.price / 100 < 1
                    //       ? `0,${item.price}`
                    //       : `${item.price / 100},00`
                    //   }
                    //   iconName={ticketSelectorStyles[index].iconName}
                    //   onPress={() => {
                    //     handleTicketTypeChange(index);
                    //   }}
                    //   expandable={true}
                    // />
                    <TicketTypeSelector
                      style={{
                        backgroundColor:
                          ticketSelectorStyles[index].backgroundColor,
                        borderColor: ticketSelectorStyles[index].borderColor,
                        textColor: ticketSelectorStyles[index].textColor,
                        iconColor: ticketSelectorStyles[index].iconColor,
                        badgeBackgroundColor:
                          ticketSelectorStyles[index].approvalBackgroundColor,
                        badgeTextcolor:
                          ticketSelectorStyles[index].approvalTextColor,
                      }}
                      hasBadge={true}
                      badgeText={`${
                        (item.maleCapacity ?? 0) + (item.femaleCapacity ?? 0)
                      } pessoas`}
                      ticketName={`${item.ticketType.toUpperCase()}`}
                      ticketPrice={
                        item.price / 100 < 1
                          ? `0,${item.price}`
                          : `${item.price / 100},00`
                      }
                      iconName={ticketSelectorStyles[index].iconName}
                      onPress={() => {
                        handleTicketTypeChange(index);
                      }}
                      expandable={true}
                      expandedList={[
                        {
                          id: "1",
                          title: "Limite de ingressos masculinos",
                          subtitle: "Quantidade limite de ingressos masculinos",
                          hasBottomDivider: true,
                          quantity: `${item.maleCapacity}`,
                        },
                        {
                          id: "2",
                          title: "Limite de ingressos femininos",
                          subtitle: "Quantidade limite de ingressos femininos",
                          hasBottomDivider: true,
                          quantity: `${item.femaleCapacity}`,
                        },
                        {
                          id: "3",
                          title: "Preço",
                          subtitle: `Valor total do produto R$ ${
                            item.price / 100 < 1
                              ? `0,${item.price}`
                              : `${item.price / 100},00`
                          }\nBônus de R$ ${
                            item.price / 100 < 1
                              ? `0,${item.price / 2}`
                              : `${item.price / 100 / 2},00`
                          } em consumo`,
                          quantity: `R$ ${
                            item.price / 100 < 1
                              ? `0,${item.price}`
                              : `${item.price / 100},00`
                          }`,
                        },
                      ]}
                    />
                  )}
                  contentContainerStyle={{ gap: verticalScale(8) }}
                />
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
                {isFormVisible && (
                  <UserInfoForm
                    ticketType={ticketType}
                    onSubmit={() => setIsConfirmationPopupVisible(true)}
                    formInputs={formInputs}
                    setFormState={setFormState}
                    formState={formState}
                    setIsSubmitButtondisabled={setIsSubmitButtondisabled}
                  />
                )}
              </View>
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  padding: moderateScale(6),
                }}
                onPress={() => {
                  WebBrowser.openBrowserAsync(
                    "https://api.whatsapp.com/send?phone=5547997689918&text=Ol%C3%A1%2C%20eu%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                  );
                }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(16),
                  }}
                >
                  Precisa de ajuda?
                </Text>
              </TouchableOpacity>
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
                  fontFamily: Fonts.regular,
                  fontSize: fontSize(15),
                  lineHeight: fontSize(20),
                  textAlign: "justify",
                }}
              >
                Mesas e reservas: +55 98406-4466
                <br />
                <br />
                Você precisa ser aceito para fazer parte. Não existe venda
                direta de ingressos, e o valor só é debitado após a aprovação.
                <br />
                <br />A Colmeia é um evento de música eletrônica inovador que
                oferece uma experiência única para o público e artistas. Com um
                rigoroso processo de seleção, garante a participação de um
                público exclusivo e altamente engajado. O evento promove
                colaboração e criatividade, proporcionando novas sensações e
                momentos memoráveis, enquanto revitaliza a cena musical
                eletrônica e destaca sua casa como um centro de inovação e
                inclusão.
                <br />
                <br />
                Política de Cancelamento:
                <br />
                <br />O Código de Defesa do Consumidor (Artigo 49) prevê que, em
                até 7 (sete) dias, o consumidor pode desistir da compra, desde
                que esse prazo não ultrapasse 48 (quarenta e oito) horas antes
                do evento. O reembolso é realizado via um processador de
                pagamentos online, pela mesma forma de pagamento utilizada na
                compra, descontada a taxa de conveniência (se houver), no prazo
                de até 45 (quarenta e cinco) dias após o cancelamento. No caso
                de compras com cartões de crédito, o valor será devolvido como
                crédito nas faturas seguintes.
                <br />
                <br />
                Bem-vindo à experiência Colmeia!
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: verticalScale(1),
                backgroundColor: colors.surfaceVariant,
              }}
            />
            <Footer />
            <View
              style={{
                height: verticalScale(60),
              }}
            />
          </ScrollView>
        </DefaultContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: moderateScale(300),
    height: moderateScale(300),
    overflow: "hidden",
    borderRadius: moderateScale(10),
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    flex: 1,
    width: "100%",
  },
});
