import {
  CalculateTicketPriceRequest,
  CalculateTicketPriceResponse,
  CouponGateway,
  GenerateCouponRequest,
  GenerateCouponResponse,
} from "./CouponGateway";

export class HttpCouponGateway implements CouponGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async generateCoupon(
    request: GenerateCouponRequest,
    jwtToken: string
  ): Promise<GenerateCouponResponse> {
    const body = JSON.stringify({
      event_id: request.eventId,
      code: request.code,
      discount_type: request.discountType,
      discount_value: request.discountValue,
      max_uses: request.maxUses,
    });
    const response = await fetch(`${this.baseUrl}/private/coupon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("Falha ao criar cupom");
    }

    const jsonResponse = await response.json();

    return {
      id: jsonResponse["id"],
      eventId: jsonResponse["event_id"],
      code: jsonResponse["code"],
      discountType: jsonResponse["discount_type"],
      discountValue: jsonResponse["discount_value"],
      maxUses: jsonResponse["max_uses"],
      usedCount: jsonResponse["used_count"],
      createdAt: jsonResponse["created_at"],
      active: jsonResponse["active"],
    };
  }

  async calculateTicketPrice(
    request: CalculateTicketPriceRequest
  ): Promise<CalculateTicketPriceResponse> {
    const body = JSON.stringify({
      event_id: request.eventId,
      ticket_pricing_id: request.ticketPricingId,
      coupon: request.coupon,
    });
    const response = await fetch(`${this.baseUrl}/public/coupon/price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });
    if (!response.ok) {
      throw new Error("Falha em utilizar o seu coupon");
    }

    const jsonResponse = await response.json();

    if (jsonResponse["coupon_valid"] == false) {
      throw new Error("O seu coupon não é mais válido");
    }

    return {
      originalPrice: jsonResponse["original_price"],
      finalPrice: jsonResponse["final_price"],
      discountApplied: jsonResponse["discount_applied"],
      isCouponValid: jsonResponse["coupon_valid"],
    };
  }
}
