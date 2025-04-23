import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import formatMoney from "@/helpers/formatMoney";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import useEventStats from "@/hooks/useEventStats";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  Card,
  Divider,
  IconButton,
  List,
  Text,
  useTheme,
} from "react-native-paper";

export default function Approvals() {
  const { colors } = useTheme();
  const { eventId } = useLocalSearchParams() as { eventId: string };
  const [isExpanded, setIsExpanded] = React.useState(false);
  const { eventStats, loading, error, reload } = useEventStats(eventId);

  if (error) {
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
          Falha ao carregar as estatísticas do evento.
        </Text>
      </View>
    );
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
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <DefaultContainer>
      <View style={{ width: "100%", rowGap: verticalScale(30) }}>
        <View style={{ width: "100%", rowGap: verticalScale(5) }}>
          <Text style={{ fontSize: fontSize(24), fontFamily: Fonts.bold }}>
            Geral
          </Text>
          <Divider />
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Ingressos vendidos
              </Text>
              <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                {eventStats?.totalTicketsSold}
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Renda total
              </Text>
              <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                {formatMoney(eventStats?.totalRevenue ?? 0)}
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Tickets validados
              </Text>
              {eventStats?.totalTicketsSold &&
              eventStats?.totalTicketsSold !== 0 ? (
                <Text>
                  <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                    {`${eventStats?.totalValidatedTickets}/`}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: Fonts.medium }}
                  >
                    {`${eventStats?.totalTicketsSold}`}
                  </Text>
                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: Fonts.regular }}
                  >
                    {` (${(
                      ((eventStats?.totalValidatedTickets ?? 0) /
                        eventStats?.totalTicketsSold) *
                      100
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}%)`}
                  </Text>
                </Text>
              ) : (
                <Text>
                  <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                    {`${eventStats?.totalValidatedTickets}/`}
                  </Text>

                  <Text
                    variant="titleLarge"
                    style={{ fontFamily: Fonts.medium }}
                  >
                    {`${eventStats?.totalTicketsSold}`}
                  </Text>
                </Text>
              )}
            </Card.Content>
          </Card>
        </View>

        <View style={{ width: "100%", rowGap: verticalScale(5) }}>
          <Text style={{ fontSize: fontSize(24), fontFamily: Fonts.bold }}>
            Pedidos de entrada
          </Text>
          <Divider />
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Pendentes
              </Text>
              <Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                  {eventStats?.totalPendingInvites ?? 0}
                </Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.medium }}>
                  {` (${(
                    ((eventStats?.totalPendingInvites ?? 0) /
                      ((eventStats?.totalPendingInvites ?? 0) +
                        (eventStats?.totalApprovedInvites ?? 0) +
                        (eventStats?.totalRejectedInvites ?? 0))) *
                    100
                  ).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}%)`}
                </Text>
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Aprovados
              </Text>
              <Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                  {eventStats?.totalApprovedInvites ?? 0}
                </Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.medium }}>
                  {` (${(
                    ((eventStats?.totalApprovedInvites ?? 0) /
                      ((eventStats?.totalPendingInvites ?? 0) +
                        (eventStats?.totalApprovedInvites ?? 0) +
                        (eventStats?.totalRejectedInvites ?? 0))) *
                    100
                  ).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}%)`}
                </Text>
              </Text>
            </Card.Content>
          </Card>
          <Card
            style={{
              width: "100%",
            }}
          >
            <Card.Content>
              <Text
                variant="titleMedium"
                style={{ fontFamily: Fonts.semiBold }}
              >
                Rejeitados
              </Text>
              <Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.bold }}>
                  {eventStats?.totalRejectedInvites ?? 0}
                </Text>
                <Text variant="titleLarge" style={{ fontFamily: Fonts.medium }}>
                  {` (${(
                    ((eventStats?.totalRejectedInvites ?? 0) /
                      ((eventStats?.totalPendingInvites ?? 0) +
                        (eventStats?.totalApprovedInvites ?? 0) +
                        (eventStats?.totalRejectedInvites ?? 0))) *
                    100
                  ).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}%)`}
                </Text>
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* <Text style={{ fontSize: fontSize(24), fontFamily: Fonts.bold }}>
          Tipos de ingressos
        </Text>
        <Divider />
        <Card
          style={{
            width: "100%",
          }}
        >
          <Card.Content>
            <Text variant="titleMedium" style={{ fontFamily: Fonts.semiBold }}>
              Lotes
            </Text>
          </Card.Content>
          <Card.Actions>
            <IconButton
              icon={isExpanded ? "chevron-up" : "chevron-down"}
              iconColor={colors.onBackground}
              mode="contained"
              onPress={() => setIsExpanded(!isExpanded)}
            />
          </Card.Actions>
        </Card> */}
      </View>
    </DefaultContainer>
  );
}
