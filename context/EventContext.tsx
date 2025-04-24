import { useAllEventsData } from "@/hooks/useAllEventsData";
import { createContext, useContext } from "react";
import { Event } from "@/infrastructure/EventGateway";

interface EventContextType {
  events: Event[];
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider");
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { events, isLoading, isError } = useAllEventsData();

  // Handle null/undefined events
  const safeEvents: Event[] = events ?? [];

  const getEventById = (id: string) =>
    safeEvents.find((event) => event.id === id);

  // You can also handle isLoading/isError in the context if needed
  if (isError) {
    // Optionally handle error state (e.g., redirect or show error)
    console.error("Failed to load events");
  }

  return (
    <EventContext.Provider value={{ events: safeEvents, getEventById }}>
      {children}
    </EventContext.Provider>
  );
};
