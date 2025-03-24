import { BACKEND_BASE_URL } from "@/helpers/applicationUrl";
import {
  StripePaymentGateway,
  StripePaymentIntentRequest,
  StripePaymentIntentResponse,
} from "./StripePaymentGateway";

export default class HttpStripePaymentGateway implements StripePaymentGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  async createPaymentIntent(
    request: StripePaymentIntentRequest
  ): Promise<StripePaymentIntentResponse> {
    const amount = request.amount;
    const currency = request.currency;
    try {
      const response = await fetch(
        `${this.baseUrl}/public/stripe/payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            currency,
          }),
        }
      );

      const { clientSecret, customer } = await response.json();

      if (!clientSecret || !customer) {
        const errorMessage =
          "Could not get clientSecret or customer from Stripe";

        throw new Error(errorMessage);
      }

      return { clientSecret, customer };
    } catch (error) {
      return {
        clientSecret: "",
        customer: "",
      };
    }
  }
}
