const eventImages: { [key: number]: any } = {
  1: {
    local: require("../assets/event_image_1.png"),
    remote:
      "https://i.ibb.co/fz0f55Jy/3000x3000-Colmeia-Maram-Rosa-Save-The-Date.png",
  },
  2: {
    local: require("../assets/event_image_2.png"),
    remote: "https://i.ibb.co/0jy2yVtg/IMG-4356.png",
  },
};

export default function getEventImageUrl(eventId: number) {
  return eventImages[eventId];
}
