export interface StripePaymentGateway {
  createPaymentIntent(
    request: StripePaymentIntentRequest
  ): Promise<StripePaymentIntentResponse>;
}

export interface StripePaymentIntentRequest {
  amount: number;
  currency: string;
}

export interface StripePaymentIntentResponse {
  clientSecret: string;
  customer: string;
}
