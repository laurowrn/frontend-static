import EventPage from "@/pages/EventPage";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function Event() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  if (eventId === "") {
    return <Redirect href="/" />;
  }

  return <EventPage eventId={eventId} />;
}
