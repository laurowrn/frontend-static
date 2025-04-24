import { EventProvider } from "@/context/EventContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <EventProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="[eventId]" />
      </Stack>
    </EventProvider>
  );
}
