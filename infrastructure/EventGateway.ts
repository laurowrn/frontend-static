export interface EventGateway {
  getEvent(eventId: string): Promise<Event>;
  registerAndJoin(
    user: User,
    eventId: number
  ): Promise<RegisterAndJoinResponse>;
}

export interface Event {
  id: string;
  name: string;
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
  location?: string;
  bio?: string;
}

export interface RegisterAndJoinResponse {
  eventId: string;
  userId: string;
  paymentURL: string;
}
