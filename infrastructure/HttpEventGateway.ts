import { EventGateway, Event } from "./EventGateway";
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
}
