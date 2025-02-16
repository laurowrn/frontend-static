import { useTheme } from "@/context/ThemeContext";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function SuccessPage() {
  const { colors } = useTheme();

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
        name="checkmark-circle"
        size={fontSize(66)}
        color={colors.primary}
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
        Compra concluída com sucesso!
      </Text>
      <Text
        style={{
          color: colors.onBackground,
          fontFamily: Fonts.regular,
          fontSize: fontSize(18),
          textAlign: "center",
        }}
      >
        Assim que o organizador aceitar a sua solicitação, o seu ingresso será
        enviado por WhatsApp.
      </Text>
      <Link href={"/"} style={{ textAlign: "center" }}>
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.regular,
            fontSize: fontSize(18),
            textAlign: "center",
          }}
        >
          Clique aqui para voltar a página inicial.
        </Text>
      </Link>
    </SafeAreaView>
  );
}
