import { useCallback, useEffect, useState } from "react";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import { EventStats } from "@/infrastructure/EventGateway";
import { useRouter } from "expo-router";

export default function useEventStats(eventId: string) {
  const { eventGateway } = useGateway();
  const { session } = useSession();
  const router = useRouter();

  const [eventStats, setEventStats] = useState<EventStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const fetchEventStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventGateway.getEventStats(
        Number(eventId),
        session || ""
      );
      setEventStats(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [eventId, session, eventGateway, router, reloadTrigger]);

  useEffect(() => {
    fetchEventStats();
  }, [fetchEventStats]);

  const reload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return { eventStats, loading, error, reload };
}
