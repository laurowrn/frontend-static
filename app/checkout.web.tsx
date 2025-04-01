import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Button,
  Text,
  TouchableOpacity,
} from "react-native";
import { Appearance, Stripe, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "react-native-paper";
import DefaultContainer from "@/components/containers/DefaultContainer";
import { useGateway } from "@/context/GatewayContext";

export default function Checkout() {
  const { colors } = useTheme();
  const { stripePaymentGateway } = useGateway();
  const [clientSecret, setClientSecret] = useState<string | null>();
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const publishablekey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishablekey) {
    throw new Error("Stripe publishable key is not set");
  }

  useEffect(() => {
    async function fetchClientSecret() {
      const requestBody = {
        amount: 1000,
        currency: "usd",
      };

      const { clientSecret } = await stripePaymentGateway.createPaymentIntent(
        requestBody
      );

      setClientSecret(clientSecret);
      setStripePromise(loadStripe(publishablekey!));
    }

    fetchClientSecret();
  }, []);

  if (!clientSecret) {
    return (
      <DefaultContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </DefaultContainer>
    );
  }

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: colors.primary,
      colorBackground: colors.background,
      colorText: colors.onBackground,
      colorTextPlaceholder: colors.onBackground,
      colorDanger: colors.error,
      colorTextSecondary: colors.onBackground,
      colorSuccess: colors.primary,
    },
  } as Appearance;

  const layout = {
    type: "accordion",
    defaultCollapsed: false,
    radios: true,
    spacedAccordionItems: false,
  };

  const options = {
    appearance,
    layout,
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: colors.background,
        justifyContent: "center",
        paddingHorizontal: horizontalScale(20),
        rowGap: verticalScale(10),
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.bold,
          fontSize: fontSize(30),
          color: colors.onBackground,
          alignSelf: "center",
        }}
      >
        Checkout
      </Text>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret, ...options }}>
          <CheckoutForm />
        </Elements>
      )}
    </View>
  );
}
