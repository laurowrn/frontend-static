import {
  EventGateway,
  Event,
  RegisterAndJoinResponse,
  User,
} from "./EventGateway";
import { useMemo } from "react";
import React, { createContext, useContext } from "react";

export class HttpEventGateway implements EventGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getEventWithTicketPricing(eventId: number): Promise<RegisterAndJoinResponse> {
    throw new Error("Method not implemented.");
  }

  async getEvent(eventId: string): Promise<Event> {
    const response = await fetch(`${this.baseUrl}/public/event/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    const event: Event = await response.json();
    return event;
  }

  async registerAndJoin(
    user: User,
    eventId: number,
    ticketPricingId: number,
    coupon: string
  ): Promise<RegisterAndJoinResponse> {
    const response = await fetch(
      `${this.baseUrl}/public/user/register-and-join-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: user.email,
            username: user.username,
            gender: user.gender,
            birthday: user.birthday,
            location: user.location,
            bio: user.bio,
            instagram_profile: user.instagram,
            phone_number: user.mobileNumber,
          },
          event_id: eventId,
          ticket_pricing_id: ticketPricingId,
          coupon: coupon,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register and join event");
    }

    const result: any = await response.json();
    return {
      eventId: result["event_id"],
      userId: result["user_id"],
      paymentURL: result["payment_url"],
    };
  }
}
