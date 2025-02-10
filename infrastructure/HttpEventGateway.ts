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
    eventId: number
  ): Promise<RegisterAndJoinResponse> {
    const response = await fetch(
      `${this.baseUrl}/public/user/register-and-join-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, event_id: eventId }),
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
