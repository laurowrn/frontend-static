import { EventGateway } from "@/infrastructure/EventGateway";
import { HttpEventGateway } from "@/infrastructure/HttpEventGateway";
import { createContext, useContext } from "react";

const EventGatewayContext = createContext<EventGateway | null>(null);

export const EventGatewayProvider: React.FC<
  React.PropsWithChildren<{ baseUrl: string }>
> = ({ baseUrl, children }) => {
  const eventGateway: EventGateway = new HttpEventGateway(baseUrl);
  return (
    <EventGatewayContext.Provider value={eventGateway}>
      {children}
    </EventGatewayContext.Provider>
  );
};

export const useEventGateway = (): EventGateway => {
  const context = useContext(EventGatewayContext);
  if (!context) {
    throw new Error(
      "useEventGateway must be used within an EventGatewayProvider"
    );
  }
  return context;
};
