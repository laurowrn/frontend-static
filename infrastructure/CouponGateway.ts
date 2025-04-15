export interface CouponGateway {
  calculateTicketPrice(
    request: CalculateTicketPriceRequest
  ): Promise<CalculateTicketPriceResponse>;
  generateCoupon(
    request: GenerateCouponRequest,
    jwtToken: string
  ): Promise<GenerateCouponResponse>;
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

export interface GenerateCouponRequest {
  eventId: number;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  validFrom?: Date;
  validUntil?: Date;
}

export interface GenerateCouponResponse {
  id: number;
  eventId: number;
  code: string;
  discountType: string;
  discountValue: number;
  maxUses: number;
  usedCount: number;
  validFrom?: Date;
  validUntil?: Date;
  createdAt?: Date;
  createdBy?: number;
  active: boolean;
}
