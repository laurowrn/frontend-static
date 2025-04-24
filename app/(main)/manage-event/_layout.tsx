import { UserEventsProvider } from "@/context/UserEventsContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <UserEventsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="[eventId]" />
      </Stack>
    </UserEventsProvider>
  );
}
