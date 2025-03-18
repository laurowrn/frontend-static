import { TicketGateway, Ticket } from "./TicketGateway";

export class HttpTicketGateway implements TicketGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(ticketId: string, jwtToken: string): Promise<Ticket> {
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
      ticketId: jsonResponse["Ticket"]["uuid"],
      eventId: jsonResponse["Ticket"]["event_id"],
      userId: jsonResponse["Ticket"]["user_id"],
      ticketPricingId: jsonResponse["Ticket"]["ticket_pricing_id"],
      alreadyValidated: jsonResponse["Ticket"]["already_validated"],
      ticketType: jsonResponse["TicketPrincingType"],
      name: jsonResponse["UserName"],
    };

    return ticket;
  }

  async validate(ticketId: string, jwtToken: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/private/ticket/${ticketId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha em validar ingresso.");
    }
  }
}
