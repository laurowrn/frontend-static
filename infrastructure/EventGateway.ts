export interface EventGateway {
  getEvent(eventId: string): Promise<Event>;
  getEvents(): Promise<Event[]>;
  registerAndJoin(
    user: User,
    eventId: number,
    ticketPricingId: number,
    payment?: Payment,
    coupon?: string
  ): Promise<RegisterAndJoinResponse>;
  getEventWithTicketPricing(
    eventId: number
  ): Promise<GetEventWithTicketPricingResponse>;
  getInvitedUsers(
    eventId: number,
    invitedUserStatus: InvitedUserStatus,
    jwtToken: string,
    search?: string
  ): Promise<InvitedUserResponse[]>;
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
  addressName: string;
  longitude: number;
  latitude: number;
  addressComplement: string;
}

export interface User {
  email: string;
  username: string;
  gender: string;
  birthday: string;
  mobileNumber: string;
  instagram: string;
  identificationNumber: string;
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
  maleCapacity?: number;
  femaleCapacity?: number;
  requiresApproval?: boolean;
}

export interface RegisterAndJoinResponse {
  eventId: string;
  userId: string;
  paymentId: string;
  status: string;
}

export interface GetEventWithTicketPricingResponse {
  event: Event;
  ticketPricings: TicketPricing[];
}

export interface Payment {
  token: string;
  description: string;
  installments: string;
  paymentMethodId: string;
  issuerId: string;
  payer: {
    email: string;
    identification: {
      type: string;
      number: string;
    };
  };
}

export interface InvitedUserResponse {
  id: number;
  email: string;
  username: string;
  instagram: string;
  role: string;
  inviteId: number;
  isFirstAccess: boolean;
  ticketPricing: TicketPricing;
}

export enum InvitedUserStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
  Cancelled = "cancelled",
}
