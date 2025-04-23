import generateSlug from "@/helpers/generateSlug";
import getEventIdFromSlug from "@/helpers/getEventIdFromSlug";
import EventPage from "@/pages/EventPage";
import { Redirect, useLocalSearchParams } from "expo-router";

export default function Event() {
  const { slug } = useLocalSearchParams() as { slug: string };
  const eventId = getEventIdFromSlug(slug);
  if (eventId === "" || eventId === null) {
    return <Redirect href="/" />;
  }

  return <EventPage eventId={eventId} />;
}
