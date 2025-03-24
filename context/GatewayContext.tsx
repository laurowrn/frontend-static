import { EventGateway } from "@/infrastructure/EventGateway";
import { TicketGateway } from "@/infrastructure/TicketGateway";
import { HttpEventGateway } from "@/infrastructure/HttpEventGateway";
import { HttpTicketGateway } from "@/infrastructure/HttpTicketGateway";
import { createContext, useContext } from "react";
import { StripePaymentGateway } from "@/infrastructure/StripePaymentGateway";
import HttpStripePaymentGateway from "@/infrastructure/HttpStripePaymentGateway";

interface GatewayContextValue {
  eventGateway: EventGateway;
  ticketGateway: TicketGateway;
  stripePaymentGateway: StripePaymentGateway;
}

const GatewayContext = createContext<GatewayContextValue | null>(null);

export const GatewayProvider: React.FC<
  React.PropsWithChildren<{ baseUrl: string }>
> = ({ baseUrl, children }) => {
  const eventGateway: EventGateway = new HttpEventGateway(baseUrl);
  const ticketGateway: TicketGateway = new HttpTicketGateway(baseUrl);
  const stripePaymentGateway: StripePaymentGateway =
    new HttpStripePaymentGateway(baseUrl);

  const value: GatewayContextValue = {
    eventGateway,
    ticketGateway,
    stripePaymentGateway,
  };

  return (
    <GatewayContext.Provider value={value}>{children}</GatewayContext.Provider>
  );
};

export const useGateway = (): GatewayContextValue => {
  const context = useContext(GatewayContext);
  if (!context) {
    throw new Error("useGateway must be used within a GatewayProvider");
  }
  return context;
};
