import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

export default function Main() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <DefaultContainer>
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          padding: moderateScale(10),
          borderRadius: moderateScale(10),
        }}
        onPress={() => {
          router.replace("/validar");
        }}
      >
        <Text
          style={{
            color: colors.onPrimary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(20),
            textAlign: "center",
          }}
        >
          Ir para a seção de validação de ingressos
        </Text>
      </TouchableOpacity>
    </DefaultContainer>
  );
}
