export interface TicketGateway {
  getTicket(ticketId: string, jwtToken: string): Promise<Ticket>;
}

export interface Ticket {
  ticketId: string;
  eventId: string;
  userId: string;
  alreadyValidated: boolean;
  ticketPricingId: string;
}
