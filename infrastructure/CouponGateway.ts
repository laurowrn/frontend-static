export interface CouponGateway {
  calculateTicketPrice(
    request: CalculateTicketPriceRequest
  ): Promise<CalculateTicketPriceResponse>;
}

export interface CalculateTicketPriceRequest {
  eventId: string;
  ticketPricingId: string;
  coupon: string;
}

export interface CalculateTicketPriceResponse {
  originalPrice: number;
  finalPrice: number;
  discountApplied: number;
  isCouponValid: boolean;
}
