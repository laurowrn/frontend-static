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
import { useEffect, useState } from "react";

export default function Confirm() {
  const [isChecked, setIsChecked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { colors } = useTheme();
  const router = useRouter();
  const eventGateway = useEventGateway();
  const params = useLocalSearchParams<{
    email?: string;
    name?: string;
    ticketType?: string;
    birthday?: string;
  }>();
  const { email, name, ticketType, birthday } = params;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && (!email || !name || !ticketType || !birthday)) {
      router.replace("/");
    }
  }, [isMounted, router, email, name, ticketType, birthday]);

  if (!isMounted || !email || !name || !ticketType || !birthday) {
    return null;
  }

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
          width: "85%",
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: horizontalScale(10),
            paddingVertical: verticalScale(6),
            width: "100%",
          }}
        >
          <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
            <Ionicons
              name={isChecked ? "checkmark-circle" : "ellipse-outline"}
              size={fontSize(20)}
              style={{ textAlign: "center", color: colors.onSurface }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                rowGap: verticalScale(5),
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: colors.onSurface,
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(13),
                }}
              >
                Concordo com a{" "}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: colors.primary,
                  fontFamily: Fonts.black,
                  fontSize: fontSize(13),
                }}
                onPress={() => router.push("/politica-privacidade")}
              >
                Política de Privacidade{" "}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: colors.onSurface,
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(13),
                }}
              >
                e os{" "}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: colors.primary,
                  fontFamily: Fonts.black,
                  fontSize: fontSize(13),
                }}
                onPress={() => router.push("/termos-e-condicoes")}
              >
                Termos e Condições.
              </Text>
            </View>
          </View>
        </View>

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
              flex: 2,
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
              backgroundColor: isChecked
                ? colors.primary
                : colors.surfaceDisabled,
              paddingVertical: verticalScale(12),
              paddingHorizontal: horizontalScale(15),
              borderRadius: moderateScale(10),
              flex: 2,
            }}
            onPress={async () => {
              let registerAndJoinData;
              function convertDate(dateString: string): string {
                const [day, month, year] = dateString.split("/");
                return `${year}-${month}-${day}T00:00:00Z`;
              }

              const formattedBirthday = convertDate(birthday);
              try {
                // registerAndJoinData = await eventGateway.registerAndJoin(
                //   {
                //     email: `${Math.floor(
                //       Math.random() * 999999999999
                //     )}@email.com`,
                //     username: "NovoUsuário2",
                //     gender: "male",
                //     birthday: "1995-06-15T00:00:00Z",
                //     location: "São Paulo",
                //     bio: "Amo eventos!",
                //   },
                //   4
                // );
                registerAndJoinData = await eventGateway.registerAndJoin(
                  {
                    email: email,
                    username: name,
                    gender: ticketType,
                    birthday: formattedBirthday,
                  },
                  4
                );
                router.back();
                await WebBrowser.openBrowserAsync(
                  registerAndJoinData.paymentURL
                );
              } catch (error) {
                router.back();
                router.push("/error");
              }
            }}
            disabled={!isChecked}
          >
            <Text
              style={{
                fontFamily: Fonts.bold,
                fontSize: fontSize(16),
                color: isChecked ? colors.onPrimary : colors.onSurfaceDisabled,
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
