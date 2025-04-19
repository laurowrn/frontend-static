import { useCallback, useEffect, useState } from "react";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import {
  InvitedUserResponse,
  InvitedUserStatus,
} from "@/infrastructure/EventGateway";
import { useRouter } from "expo-router";

export default function useInvitedUsersData(
  eventId: string,
  status: InvitedUserStatus,
  search?: string
) {
  const { eventGateway } = useGateway();
  const { session } = useSession();
  const router = useRouter();

  const [invitedUsers, setInvitedUsers] = useState<InvitedUserResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const fetchInvitedUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eventGateway.getInvitedUsers(
        Number(eventId),
        status,
        session || "",
        search
      );
      setInvitedUsers(response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [eventId, status, session, eventGateway, router, search, reloadTrigger]);

  useEffect(() => {
    fetchInvitedUsers();
  }, [fetchInvitedUsers]);

  const reload = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  return { invitedUsers, loading, error, reload };
}
