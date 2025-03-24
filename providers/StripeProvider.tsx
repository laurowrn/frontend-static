import { StripeProvider } from "@stripe/stripe-react-native";
import Linking from "expo-linking";

export default function ExpoStripeProvider(
  props: Omit<
    React.ComponentProps<typeof StripeProvider>,
    "publishableKey" | "merchantIdentifier"
  >
) {
  const publishablekey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const merchantIdentifier = process.env.EXPO_PUBLIC_STRIPE_MERCHANT_IDENTIFIER;

  if (!publishablekey) {
    throw new Error("Stripe publishable key is not set");
  }

  if (!merchantIdentifier) {
    throw new Error("Stripe merchant identifier is not set");
  }

  return (
    <StripeProvider
      publishableKey={publishablekey}
      merchantIdentifier={merchantIdentifier}
      urlScheme={Linking.createURL("/")?.split(":")[0]}
      {...props}
    />
  );
}
