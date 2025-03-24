import React, { useState, FormEvent } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  PaymentElementProps,
} from "@stripe/react-stripe-js";
import Linking from "expo-linking";
import { TouchableOpacity, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";
import GenericButton from "./GenericButton";
import { FRONTEND_BASE_URL } from "@/helpers/applicationUrl";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { colors } = useTheme();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${FRONTEND_BASE_URL}/success`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "An error occurred");
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: PaymentElementProps = {
    id: "payment-element",
    options: {
      layout: "accordion",
    },
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement {...paymentElementOptions} />
      <View style={{ height: verticalScale(20) }} />
      <GenericButton
        backgroundColor={colors.primary}
        textColor={colors.onPrimary}
        onPress={handleSubmit as unknown as () => void}
        disabled={isLoading || !stripe || !elements}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.onPrimary} />
        ) : (
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(22),
              color: colors.onPrimary,
              textAlign: "center",
            }}
          >
            Comprar
          </Text>
        )}
      </GenericButton>
    </form>
  );
}
