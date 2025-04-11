import PrivateEventPage from "@/pages/PrivateEventPage";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function Event() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  if (eventId === "") {
    return <Redirect href="/explore" />;
  }

  return <PrivateEventPage eventId={eventId} />;
}
