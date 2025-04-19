import DefaultContainer from "@/components/containers/DefaultContainer";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { View, TextInput as RNTextInput } from "react-native";
import { FlatList } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import { InvitedUserStatus } from "@/infrastructure/EventGateway";
import useInvitedUsersData from "@/hooks/useInvitedUsersData";
import {
  ActivityIndicator,
  useTheme,
  Text,
  TextInput,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import { Fonts } from "@/constants/fonts";
import RequestApprovalCard from "@/components/event/RequestApprovalCard";
import { useState, useEffect, useRef, memo } from "react";

const SearchInput = memo(
  ({
    value,
    onChangeText,
    colors,
  }: {
    value: string;
    onChangeText: (text: string) => void;
    colors: any;
  }) => {
    const inputRef = useRef<RNTextInput>(null);

    return (
      <TextInput
        ref={inputRef}
        onChangeText={onChangeText}
        value={value}
        mode="outlined"
        label={
          <Text
            style={{
              color: colors.onSurfaceVariant,
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            Pesquisa
          </Text>
        }
        placeholder="Digite o nome ou email do convidado"
        style={{
          backgroundColor: colors.elevation.level0,
          fontFamily: Fonts.regular,
          width: "100%",
        }}
        contentStyle={{ fontFamily: Fonts.regular, fontSize: fontSize(14) }}
        left={<TextInput.Icon icon="magnify" />}
        right={
          value ? (
            <TextInput.Icon icon="close" onPress={() => onChangeText("")} />
          ) : null
        }
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        autoFocus={false}
      />
    );
  }
);

export default function Approvals() {
  const { eventId } = useLocalSearchParams() as { eventId: string };
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { invitedUsers, loading, error, reload } = useInvitedUsersData(
    eventId,
    InvitedUserStatus.Pending,
    debouncedSearch
  );
  const { inviteGateway } = useGateway();
  const { session } = useSession();
  const { colors } = useTheme();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <DefaultContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flex: 1,
        }}
      >
        <SearchInput value={search} onChangeText={setSearch} colors={colors} />
        <View style={{ height: verticalScale(15) }} />

        {error ? (
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
                fontFamily: Fonts.regular,
                fontSize: fontSize(14),
                textAlign: "center",
                marginTop: verticalScale(10),
                color: colors.error,
              }}
              onPress={reload}
            >
              Falha ao carregar lista de usuários pendentes
            </Text>
          </View>
        ) : loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              width: "100%",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : invitedUsers?.length === 0 ? (
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
              {search
                ? "Nenhum usuário pendente encontrado para a pesquisa."
                : "Todos os pedidos para entrar no evento já foram respondidos, aguarde mais solicitações."}
            </Text>
          </View>
        ) : (
          <FlatList
            data={invitedUsers}
            keyExtractor={(item) => item.inviteId.toString()}
            renderItem={({ item }) => (
              <RequestApprovalCard
                name={item.username}
                email={item.email}
                instagram={item.instagram}
                ticketType={item.ticketPricing}
                onApprove={async () => {
                  try {
                    await inviteGateway.approveJoinRequest(
                      { inviteId: item.inviteId, approved: true },
                      session || ""
                    );
                    reload();
                  } catch (error: any) {}
                }}
                onReject={async () => {
                  try {
                    await inviteGateway.approveJoinRequest(
                      { inviteId: item.inviteId, approved: false },
                      session || ""
                    );
                    reload();
                  } catch (error: any) {}
                }}
              />
            )}
            contentContainerStyle={{ gap: verticalScale(10) }}
            style={{
              width: "100%",
              flex: 1,
            }}
            scrollEnabled={true}
          />
        )}
      </View>
    </DefaultContainer>
  );
}
