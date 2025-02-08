export interface EventGateway {
  getEvent(eventId: string): Promise<Event>;
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
