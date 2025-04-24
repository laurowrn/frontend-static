import { useAllEventsData } from "@/hooks/useAllEventsData";
import { createContext, useContext } from "react";
import { Event, GetEventsByUserResponse } from "@/infrastructure/EventGateway";
import { useUserEventsData } from "@/hooks/useUserEventsData";

interface EventContextType {
  events: GetEventsByUserResponse[];
  getEventById: (id: string) => GetEventsByUserResponse | undefined;
}

const UserEventsContext = createContext<EventContextType | undefined>(
  undefined
);

export const useUserEventsContext = () => {
  const context = useContext(UserEventsContext);
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider");
  }
  return context;
};

export const UserEventsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { events, isLoading, isError } = useUserEventsData();

  // Handle null/undefined events
  const safeEvents: GetEventsByUserResponse[] = events ?? [];

  const getEventById = (id: string) =>
    safeEvents.find((event) => event.event.id === id);

  // You can also handle isLoading/isError in the context if needed
  if (isError) {
    // Optionally handle error state (e.g., redirect or show error)
    console.error("Failed to load events");
  }

  return (
    <UserEventsContext.Provider value={{ events: safeEvents, getEventById }}>
      {children}
    </UserEventsContext.Provider>
  );
};
