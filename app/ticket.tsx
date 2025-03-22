import DefaultContainer from "@/components/containers/DefaultContainer";
import FormTextInput from "@/components/form/FormTextInput";
import GenericButton from "@/components/GenericButton";
import { Fonts } from "@/constants/fonts";
import { useSession } from "@/context/AuthContext";
import { useGateway } from "@/context/GatewayContext";
import { useTheme } from "@/context/ThemeContext";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";

import * as WebBrowser from "expo-web-browser";

export default function Ticket() {
  const { session } = useSession();
  const { ticketGateway } = useGateway();
  const [email, setEmail] = useState<string>("");
  const [ticketId, setTicketId] = useState("a");
  const router = useRouter();
  const [isTicketLoading, setIsTicketLoading] = useState(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(false);
  const { colors } = useTheme();
  return (
    <DefaultContainer>
      {isQRCodeVisible ? (
        <View
          style={{
            rowGap: verticalScale(40),
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(30),
              color: colors.onBackground,
              textAlign: "center",
            }}
          >
            Aqui está o seu ingresso:
          </Text>
          <QRCodeStyled
            data={ticketId}
            style={{ backgroundColor: "white" }}
            padding={20}
            pieceSize={moderateScale(12)}
          />
          <Ionicons
            name="arrow-back"
            size={fontSize(30)}
            color={colors.onPrimary}
            style={{
              position: "absolute",
              backgroundColor: colors.primary,
              padding: moderateScale(8),
              borderRadius: moderateScale(10),
              top: verticalScale(20),
              left: horizontalScale(20),
            }}
            onPress={() => {
              setIsQRCodeVisible(false);
            }}
          />
        </View>
      ) : (
        <View
          style={{
            rowGap: verticalScale(80),
            width: "100%",
          }}
        >
          <View style={{ rowGap: verticalScale(10) }}>
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: fontSize(30),
                color: colors.onBackground,
                textAlign: "center",
              }}
            >
              Ingresso
            </Text>
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: fontSize(15),
                color: colors.onBackground,
                textAlign: "justify",
              }}
            >
              O seu ingresso pode levar até 5 minutos para ser processado. Após
              isso, preencha o seu e-mail utilizado na compra, e clique no botão
              "Obter ingresso".
            </Text>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                padding: moderateScale(6),
              }}
              onPress={() => {
                WebBrowser.openBrowserAsync(
                  "https://api.whatsapp.com/send?phone=5547997689918&text=Ol%C3%A1%2C%20eu%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                );
              }}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: Fonts.bold,
                  fontSize: fontSize(16),
                }}
              >
                Precisa de ajuda?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ rowGap: verticalScale(20) }}>
            <FormTextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu e-mail"
              inputMode="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              styles={{
                textInputContainer: {
                  borderColor: colors.onPrimary,
                  color: colors.onPrimary,
                  backgroundColor: colors.primary,
                },
                label: {},
                icons: {},
              }}
            />
            <GenericButton
              backgroundColor={colors.primary}
              textColor={colors.onPrimary}
              disabled={isTicketLoading}
              onPress={async () => {
                try {
                  setIsTicketLoading(true);
                  const receivedTicketId = await ticketGateway.getByEmail(
                    email
                  );
                  setTicketId(receivedTicketId);
                  setIsTicketLoading(false);
                  setIsQRCodeVisible(true);
                } catch (error: any) {
                  setIsTicketLoading(false);
                  router.push(`/error?message=${error.message}`);
                }
              }}
            >
              {isTicketLoading ? (
                <ActivityIndicator size="small" color={colors.onPrimary} />
              ) : (
                <Text>Obter ingresso</Text>
              )}
            </GenericButton>
          </View>
        </View>
      )}
    </DefaultContainer>
  );
}
