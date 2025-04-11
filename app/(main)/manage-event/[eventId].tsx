import EventManagingPage from "@/pages/EventManagingPage";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function Event() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  if (eventId === "") {
    return <Redirect href="/explore" />;
  }

  return <EventManagingPage eventId={eventId} />;
}
