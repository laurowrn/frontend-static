import {
  CalculateTicketPriceRequest,
  CalculateTicketPriceResponse,
  CouponGateway,
} from "./CouponGateway";

export class HttpCouponGateway implements CouponGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
