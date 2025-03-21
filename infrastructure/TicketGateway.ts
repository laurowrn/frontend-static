export interface TicketGateway {
  get(ticketId: string, jwtToken: string): Promise<Ticket>;
  getByEmail(email: string): Promise<string>;
  validate(ticketId: string, jwtToken: string): Promise<void>;
}

export interface Ticket {
  ticketId: string;
  eventId: string;
  userId: string;
  alreadyValidated: boolean;
  ticketPricingId: string;
  ticketType: string;
  name: string;
}
