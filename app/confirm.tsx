import { Fonts } from "@/constants/fonts";
import { useEventGateway } from "@/context/EventGatewayContext";
import { useTheme } from "@/context/ThemeContext";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";

export default function Confirm() {
  const { colors } = useTheme();
  const router = useRouter();
  const eventGateway = useEventGateway();
  const { email, name, ticketType, birthday } = useLocalSearchParams<{
    email?: string;
    name?: string;
    ticketType?: string;
    birthday?: string;
  }>();
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000d0",
      }}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => router.back()}
      />
      <Animated.View
        entering={FadeInDown}
        style={{
          width: "80%",
          maxWidth: horizontalScale(1000),
          paddingVertical: verticalScale(20),
          paddingHorizontal: horizontalScale(20),
          borderRadius: moderateScale(10),
          borderWidth: moderateScale(0.5),
          borderColor: colors.onBackground,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
          rowGap: verticalScale(30),
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.regular,
            fontSize: fontSize(16),
            textAlign: "justify",
            color: colors.onBackground,
          }}
        >
          Ao completar a compra, você deverá esperar a confirmação do
          organizador do evento. Após a confirmação, o seu ingresso chegará por
          WhatsApp.
        </Text>
        <Animated.View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.error,
              paddingVertical: verticalScale(12),
              paddingHorizontal: horizontalScale(15),
              borderWidth: moderateScale(0.5),
              borderColor: colors.onError,
              borderRadius: moderateScale(10),
              flex: 1,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: fontSize(16),
                color: colors.onError,
                textAlign: "center",
              }}
            >
              Cancelar
            </Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: verticalScale(12),
              paddingHorizontal: horizontalScale(15),
              borderWidth: moderateScale(0.5),
              borderColor: colors.onPrimary,
              borderRadius: moderateScale(10),
              flex: 1,
            }}
            onPress={async () => {
              let registerAndJoinData;
              try {
                registerAndJoinData = await eventGateway.registerAndJoin(
                  {
                    email: `${Math.floor(
                      Math.random() * 999999999999
                    )}@email.com`,
                    username: "NovoUsuário2",
                    gender: "male",
                    birthday: "1995-06-15T00:00:00Z",
                    location: "São Paulo",
                    bio: "Amo eventos!",
                  },
                  4
                );
                router.back();
                let result = await WebBrowser.openBrowserAsync(
                  registerAndJoinData.paymentURL
                );
                console.log(result);
              } catch (error) {
                router.back();
                router.push("/error");
              }
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: fontSize(16),
                color: colors.onPrimary,
                textAlign: "center",
              }}
            >
              Continuar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}
