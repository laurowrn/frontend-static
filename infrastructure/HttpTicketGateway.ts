import { TicketGateway, Ticket } from "./TicketGateway";

export class HttpTicketGateway implements TicketGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTicket(ticketId: string, jwtToken: string): Promise<Ticket> {
    const response = await fetch(`${this.baseUrl}/private/ticket/${ticketId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha em pegar informações do ingresso.");
    }

    const jsonResponse = await response.json();
    const ticket: Ticket = {
      ticketId: jsonResponse["uuid"],
      eventId: jsonResponse["event_id"],
      userId: jsonResponse["user_id"],
      ticketPricingId: jsonResponse["ticket_pricing_id"],
      alreadyValidated: jsonResponse["already_validated"],
    };

    return ticket;
  }
}
