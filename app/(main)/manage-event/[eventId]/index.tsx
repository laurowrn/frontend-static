import { useUserEventsContext } from "@/context/UserEventsContext";
import EventManagingPage from "@/pages/EventManagingPage";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function EventManaging() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  const { getEventById } = useUserEventsContext();
  const event = getEventById(eventId);

  if (eventId === "") {
    return <Redirect href="/explore" />;
  }

  return <EventManagingPage eventId={eventId} />;
}
