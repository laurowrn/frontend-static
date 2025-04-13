import { useGateway } from "@/context/GatewayContext";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { TicketPricing, User } from "@/infrastructure/EventGateway";
import { Payment } from "@mercadopago/sdk-react";
import { ExternalPathString, useRouter } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme, Text, Appbar } from "react-native-paper";
import { Dimensions } from "react-native";
import { Fonts } from "@/constants/fonts";
import formatMoney from "@/helpers/formatMoney";

interface TransparentCheckoutFormProps {
  user: User;
  eventId: number;
  ticketPricing: TicketPricing;
  coupon: string;
  onDismiss: () => void;
}

export default function TransparentCheckoutForm({
  user,
  eventId,
  ticketPricing,
  coupon,
  onDismiss,
}: TransparentCheckoutFormProps) {
  const router = useRouter();
  const { eventGateway } = useGateway();
  const { colors } = useTheme();

  const { height: screenHeight } = Dimensions.get("window");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        minHeight: screenHeight,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={onDismiss} />
        <Appbar.Content title="Checkout" />
      </Appbar.Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: horizontalScale(16),
          paddingBottom: verticalScale(20),
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: fontSize(40),
            width: "100%",
            textAlign: "center",
          }}
        >
          {formatMoney(ticketPricing.price)}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: fontSize(20),
            width: "100%",
            textAlign: "center",
          }}
        >
          {ticketPricing.ticketType} - Lote {ticketPricing.lot}
        </Text>
        <Payment
          initialization={{
            amount: 10,
          }}
          onSubmit={async (param) => {
            let registerAndJoinData;
            try {
              registerAndJoinData = await eventGateway.registerAndJoin(
                {
                  email: user.email,
                  username: user.username,
                  gender: ticketPricing.id.toString(),
                  birthday: new Date(
                    user.birthday.split("/").reverse().join("-")
                  ).toISOString(),
                  mobileNumber: user.mobileNumber.replace(/[()\s-]/g, ""),
                  instagram: user.instagram,
                  identificationNumber: user.identificationNumber.replace(
                    /[.-]/g,
                    ""
                  ),
                },
                1,
                ticketPricing.id,
                {
                  token: param.formData.token,
                  description: "",
                  installments: param.formData.installments.toString(),
                  paymentMethodId: param.formData.payment_method_id,
                  issuerId: param.formData.issuer_id,
                  payer: {
                    email: param.formData.payer.email,
                    identification: {
                      type: param.formData.payer.identification.type,
                      number: param.formData.payer.identification.number,
                    },
                  },
                },
                coupon
              );
              if (registerAndJoinData.status === "approved") {
                router.replace("/success");
              } else {
                router.replace("/fail");
              }
            } catch (error: any) {
              router.navigate(`/error?message=${error.message}`);
            }
          }}
          customization={{
            visual: {
              style: {
                theme: "dark",
                customVariables: {
                  formBackgroundColor: colors.background,
                  errorColor: colors.error,
                  baseColor: colors.primary,
                  baseColorFirstVariant: colors.secondary,
                  baseColorSecondVariant: colors.tertiary,
                  inputBackgroundColor: colors.background,
                  successColor: colors.primary,
                  textPrimaryColor: colors.onBackground,
                },
              },
            },
            paymentMethods: {
              creditCard: "all",
              atm: "all",
              maxInstallments: 1,
            },
          }}
        />
      </ScrollView>
    </View>
  );
}
