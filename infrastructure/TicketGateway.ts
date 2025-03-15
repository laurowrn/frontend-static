export interface TicketGateway {
  getTicket(ticketId: string): Promise<Ticket>;
}

export interface Ticket {
  uuid: string;
  event_id: string;
  user_id: string;
  alreadyValidated: boolean;
  validatedBy: number;
  validationDate: Date;
  ticketPricingId: number;
  isPrivate: boolean;
  autoAccept: boolean;
}
