import {
  EventGateway,
  Event,
  RegisterAndJoinResponse,
  User,
  GetEventWithTicketPricingResponse,
  Payment,
  InvitedUserResponse,
  InvitedUserStatus,
  EventStats,
} from "./EventGateway";

export class HttpEventGateway implements EventGateway {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getEventStats(eventID: number, jwtToken: string): Promise<EventStats> {
    const response = await fetch(
      `${this.baseUrl}/private/event/${eventID}/stats`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Falha em pegar estatísticas do evento.");
    }
    const jsonResponse = await response.json();

    const eventStats: EventStats = {
      totalTicketsSold: jsonResponse["total_tickets_sold"],
      totalInvites: jsonResponse["total_invites"],
      totalPendingInvites: jsonResponse["total_pending_invites"],
      totalRejectedInvites: jsonResponse["total_rejected_invites"],
      totalAcceptedInvites: jsonResponse["total_accepted_invites"],
      ticketsSoldByPricing: jsonResponse["tickets_sold_by_pricing"].map(
        (pricing: any) => ({
          ticketPricingId: pricing["ticket_pricing_id"],
          ticketType: pricing["ticket_type"],
          lot: pricing["lot"],
          price: pricing["price"],
          ticketsSold: pricing["tickets_sold"],
        })
      ),
      totalRevenue: jsonResponse["total_revenue"],
      totalValidatedTickets: jsonResponse["total_validated_tickets"],
      roleDistribution: jsonResponse["role_distribution"].map((role: any) => ({
        roleId: role["role_id"],
        roleName: role["role_name"],
        userCount: role["user_count"],
      })),
    };

    return eventStats;
  }

  async getInvitedUsers(
    eventId: number,
    invitedUserStatus: InvitedUserStatus,
    jwtToken: string,
    search: string
  ): Promise<InvitedUserResponse[]> {
    const response = await fetch(
      `${
        this.baseUrl
      }/private/invite/event/${eventId}?status=${invitedUserStatus}&search=${
        search || ""
      }`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Falha em pegar lista de convidados.");
    }
    const jsonResponse = await response.json();

    if (!jsonResponse["invites"] || jsonResponse["invites"].length === 0) {
      return [];
    }

    const users: InvitedUserResponse[] = jsonResponse["invites"].map(
      (invite: any) => ({
        id: invite["user"]["id"],
        email: invite["user"]["email"],
        username: invite["user"]["username"],
        instagram: invite["user"]["instagram_profile"],
        role: invite["user"]["role"],
        isFirstAccess: invite["user"]["is_first_access"],
        inviteId: invite["invite_id"],
        ticketPricing: {
          id: invite["ticket_pricing"]["id"],
          eventId: invite["ticket_pricing"]["event_id"],
          ticketType: invite["ticket_pricing"]["ticket_type"],
          lot: invite["ticket_pricing"]["lot"],
          price: invite["ticket_pricing"]["price"],
        },
        paymentDetails: {
          authorizedAmount: invite["payment_details"]["authorized_amount"],
          coupon: invite["payment_details"]["coupon"],
        },
      })
    );

    return users;
  }

  async getEvents(): Promise<Event[]> {
    const response = await fetch(`${this.baseUrl}/public/event`);
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const jsonResponse = await response.json();
    return jsonResponse.map((event: any) => ({
      id: event["id"].toString(),
      name: event["name"],
      description: event["description"],
      isPaid: event["is_paid"],
      startDate: new Date(event["start_date"]),
      endDate: new Date(event["end_date"]),
      location: event["location"],
      isPrivate: event["is_private"],
      autoAccept: event["auto_accept"],
      addressName: event["address_name"],
      longitude: event["longitude"],
      latitude: event["latitude"],
      addressComplement: event["address_complement"],
    }));
  }

  async getEventWithTicketPricing(
    eventId: number
  ): Promise<GetEventWithTicketPricingResponse> {
    const response = await fetch(
      `${this.baseUrl}/public/event/${eventId}/with-ticket-pricing`
    );
    if (!response.ok) {
      throw new Error("Falha em pegar informações do evento.");
    }
    const jsonReponse = await response.json();
    const eventWithTicketPricing: GetEventWithTicketPricingResponse = {
      event: {
        id: jsonReponse["event"]["id"],
        name: jsonReponse["event"]["name"],
        description: jsonReponse["event"]["description"],
        isPaid: jsonReponse["event"]["is_paid"],
        startDate: new Date(jsonReponse["event"]["start_date"]),
        endDate: new Date(jsonReponse["event"]["end_date"]),
        location: jsonReponse["event"]["location"],
        isPrivate: jsonReponse["event"]["is_private"],
        autoAccept: jsonReponse["event"]["auto_accept"],
        addressName: jsonReponse["event"]["address_name"],
        longitude: jsonReponse["event"]["longitude"],
        latitude: jsonReponse["event"]["latitude"],
        addressComplement: jsonReponse["event"]["address_complement"],
      },
      ticketPricings: jsonReponse["ticket_pricing"].map((pricing: any) => ({
        id: pricing["id"],
        lot: pricing["lot"],
        price: pricing["price"],
        ticketType: pricing["ticket_type"],
        event: pricing["event_id"],
        maleCapacity: pricing["male_capacity"],
        femaleCapacity: pricing["female_capacity"],
      })),
    };
    return eventWithTicketPricing;
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
    payment?: Payment,
    coupon?: string
  ): Promise<RegisterAndJoinResponse> {
    const body = JSON.stringify({
      user: {
        email: user.email,
        username: user.username,
        gender: user.gender,
        birthday: user.birthday,
        location: user.location,
        bio: user.bio,
        instagram_profile: user.instagram,
        phone_number: user.mobileNumber,
        identification_number: user.identificationNumber,
      },
      event_id: eventId,
      ticket_pricing_id: ticketPricingId,
      coupon: coupon,
      payment: payment
        ? {
            token: payment.token,
            description: "Descricao do pagamento",
            installments: Number(payment.installments),
            payment_method_id: payment.paymentMethodId,
            issuer_id: payment.issuerId,
            payer: {
              email: payment.payer.email,
              identification: {
                type: payment.payer.identification.type,
                number: payment.payer.identification.number,
              },
            },
          }
        : undefined,
    });

    const response = await fetch(
      `${this.baseUrl}/public/user/register-and-join-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    if (response.status == 409) {
      throw new Error(
        "Falha: você só pode comprar um ingresso para este evento."
      );
    }
    if (!response.ok) {
      throw new Error("Falha na comunicação com o servidor, tente novamente.");
    }

    const result: any = await response.json();
    return {
      eventId: result["event_id"],
      userId: result["user_id"],
      paymentId: result["payment_id"],
      status: result["status"],
    };
  }
}
