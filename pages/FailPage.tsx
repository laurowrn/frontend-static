import { Button, useTheme } from "react-native-paper";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useRouter } from "expo-router";

export default function FailPage() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal:
          Dimensions.get("window").width < 768
            ? horizontalScale(20)
            : horizontalScale(300),
        rowGap: verticalScale(30),
      }}
    >
      <Ionicons
        name="close"
        size={fontSize(66)}
        color={colors.error}
        style={{ textAlign: "center" }}
      />
      <Text
        style={{
          color: colors.onBackground,
          fontFamily: Fonts.bold,
          fontSize: fontSize(26),
          textAlign: "center",
        }}
      >
        Compra rejeitada!
      </Text>
      <Text
        style={{
          color: colors.primary,
          fontFamily: Fonts.regular,
          fontSize: fontSize(18),
          textAlign: "center",
        }}
      >
        Verifique o seu cartão de crédito e tente novamente
      </Text>
      <Button
        onPress={() => {
          router.back();
        }}
        mode="contained"
      >
        Voltar
      </Button>
    </SafeAreaView>
  );
}
