import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { View } from "react-native";
import {
  Card,
  Dialog,
  IconButton,
  Portal,
  Text,
  useTheme,
  Button,
  Snackbar,
} from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import { TicketPricing } from "@/infrastructure/EventGateway";
import { useState } from "react";
import formatMoney from "@/helpers/formatMoney";

interface RequestApprovalCardProps {
  name: string;
  email: string;
  instagram: string;
  ticketType: TicketPricing;
  authorizedAmount: number;
  coupon?: string;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

export default function RequestApprovalCard({
  name,
  email,
  instagram,
  ticketType,
  authorizedAmount,
  coupon,
  onApprove,
  onReject,
}: RequestApprovalCardProps) {
  const { colors } = useTheme();

  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);
  const [isApproval, setIsApproval] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsConfirmationDialogVisible(false);
    try {
      if (isApproval) {
        await onApprove();
      } else {
        await onReject();
      }
    } catch (error: any) {
      setErrorMessage("Falha ao processar a ação. Tente novamente.");
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        {isConfirmationDialogVisible && (
          <Portal>
            <Dialog
              visible={isConfirmationDialogVisible}
              onDismiss={() => setIsConfirmationDialogVisible(false)}
            >
              <Dialog.Title>Confirmação</Dialog.Title>
              <Dialog.Content>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(16),
                    paddingBottom: verticalScale(5),
                  }}
                >
                  {`Deseja realmente ${
                    isApproval ? "aprovar" : "recusar"
                  } este convidado?`}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(15),
                  }}
                >
                  Nome: {name}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: fontSize(15),
                  }}
                >
                  Tipo de ingresso: {ticketType.ticketType}
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => setIsConfirmationDialogVisible(false)}
                  mode="outlined"
                  style={{
                    borderColor: colors.error,
                    marginRight: horizontalScale(10),
                  }}
                  textColor={colors.error}
                >
                  Cancelar
                </Button>
                <Button
                  onPress={handleConfirm}
                  mode="contained"
                  style={{ backgroundColor: colors.primary }}
                >
                  Confirmar
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        )}
        <Card.Content
          style={{ padding: 0, flex: 3.6, rowGap: verticalScale(5) }}
        >
          <Text variant="titleMedium" style={{ fontFamily: Fonts.bold }}>
            {name}
          </Text>
          <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
            Email: {email}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
              Instagram: {""}
            </Text>
            <Text
              variant="bodySmall"
              style={{ fontFamily: Fonts.black, color: colors.primary }}
              onPress={() =>
                WebBrowser.openBrowserAsync(
                  `https://instagram.com/${instagram}`
                )
              }
            >
              @{instagram}
            </Text>
          </View>
          <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
            Tipo de ingresso: {ticketType.ticketType} - Lote {ticketType.lot}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ flexShrink: 1 }}>
              <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
                Valor pago: {formatMoney(authorizedAmount)}
              </Text>
              {coupon && (
                <Text
                  variant="bodySmall"
                  style={{
                    fontFamily: Fonts.regular,
                  }}
                >
                  {" - com cupom "}
                </Text>
              )}
              <Text
                variant="bodySmall"
                style={{
                  fontFamily: Fonts.semiBold,
                  color: colors.primary,
                }}
              >
                {coupon}
              </Text>
            </Text>
          </View>
        </Card.Content>
        <Card.Actions
          style={{
            padding: 0,
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="close-circle"
            containerColor={colors.errorContainer}
            iconColor={colors.onErrorContainer}
            mode="contained"
            onPress={() => {
              setIsApproval(false);
              setIsConfirmationDialogVisible(true);
            }}
            accessibilityLabel="Recusar convidado"
          />
          <IconButton
            icon="check"
            containerColor={colors.primaryContainer}
            iconColor={colors.onPrimaryContainer}
            mode="contained"
            onPress={() => {
              setIsApproval(true);
              setIsConfirmationDialogVisible(true);
            }}
            accessibilityLabel="Aprovar convidado"
          />
        </Card.Actions>
      </View>
      <Snackbar
        visible={!!errorMessage}
        onDismiss={() => setErrorMessage(null)}
        duration={3000}
        style={{ backgroundColor: colors.errorContainer }}
      >
        <Text style={{ color: colors.onErrorContainer }}>{errorMessage}</Text>
      </Snackbar>
    </Card>
  );
}
