export interface EventGateway {
  getEvent(eventId: string): Promise<Event>;
  registerAndJoin(
    user: User,
    eventId: number,
    ticketPricingId: number,
    coupon?: string
  ): Promise<RegisterAndJoinResponse>;
  getEventWithTicketPricing(
    eventId: number
  ): Promise<GetEventWithTicketPricingResponse>;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  isPaid: boolean;
  startDate: Date;
  endDate: Date;
  location: string;
  isPrivate: boolean;
  autoAccept: boolean;
}

export interface User {
  email: string;
  username: string;
  gender: string;
  birthday: string;
  mobileNumber: string;
  instagram: string;
  cupom?: string;
  location?: string;
  bio?: string;
}

export interface TicketPricing {
  id: number;
  eventId: number;
  ticketType: string;
  lot: number;
  price: number;
}

export interface RegisterAndJoinResponse {
  eventId: string;
  userId: string;
  paymentURL?: string;
}

export interface GetEventWithTicketPricingResponse {
  event: Event;
  ticketPricings: TicketPricing[];
}
