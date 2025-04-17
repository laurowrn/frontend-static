const eventImages: { [key: number]: any } = {
  1: require("../assets/event_image_2.png"),
  2: require("../assets/event_image_1.png"),
};

export default function getEventImageUrl(eventId: number) {
  return eventImages[eventId];
}
