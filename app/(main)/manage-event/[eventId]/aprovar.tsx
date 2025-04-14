import DefaultContainer from "@/components/containers/DefaultContainer";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { View } from "react-native";
import RequestApprovalCard from "@/components/event/RequestApprovalCard";
import { FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import {
  InvitedUserResponse,
  InvitedUserStatus,
} from "@/infrastructure/EventGateway";
import useInvitedUsersData from "@/hooks/useInvitedUsersData";
import { ActivityIndicator, useTheme, Text } from "react-native-paper";
import { Fonts } from "@/constants/fonts";

export default function Approvals() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  const { invitedUsers, loading, error, reload } = useInvitedUsersData(
    eventId,
    InvitedUserStatus.Pending
  );
  const { inviteGateway } = useGateway();
  const { session } = useSession();
  const router = useRouter();
  const { colors } = useTheme();

  if (error) {
    router.replace(
      "/error?message=Falha em carregar lista de usuários pendentes"
    );
    return;
  }

  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          width: "100%",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (invitedUsers?.length == 0) {
    return (
      <DefaultContainer>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.extraLight,
              fontSize: fontSize(15),
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Todos os pedidos para entrar no evento já foram respondidos, aguarde
            mais solicitações.
          </Text>
        </View>
      </DefaultContainer>
    );
  }

  return (
    <DefaultContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <FlatList
          data={invitedUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RequestApprovalCard
              name={item.username}
              email={item.email}
              instagram={item.instagram}
              onApprove={async () => {
                try {
                  const response = await inviteGateway.approveJoinRequest(
                    { inviteId: item.inviteId, approved: true },
                    session || ""
                  );
                  reload();
                } catch (error: any) {}
              }}
              onReject={() => {}}
            />
          )}
          contentContainerStyle={{ gap: verticalScale(10) }}
          style={{
            width: "100%",
          }}
          scrollEnabled={true}
        />
      </View>
    </DefaultContainer>
  );
}
