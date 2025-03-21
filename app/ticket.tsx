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
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import QRCodeStyled from "react-native-qrcode-styled";

export default function Ticket() {
  const { session } = useSession();
  const { ticketGateway } = useGateway();
  const [email, setEmail] = useState<string>("");
  const [ticketId, setTicketId] = useState("a");
  const router = useRouter();
  const [isTicketLoading, setIsTicketLoading] = useState(false);
  const [isQRCodeVisible, setIsQRCodeVisible] = useState(true);
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
            rowGap: verticalScale(20),
            width: "100%",
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
            Ingresso
          </Text>
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
                const receivedTicketId = await ticketGateway.getByEmail(email);
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
      )}
    </DefaultContainer>
  );
}
