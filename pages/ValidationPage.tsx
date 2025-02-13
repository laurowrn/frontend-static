import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { Text } from "react-native";

export default function ValidationPage() {
  const { colors } = useTheme();
  return (
    <DefaultContainer>
      <Text
        style={{
          color: colors.onBackground,
          fontFamily: Fonts.bold,
          fontSize: fontSize(22),
          textAlign: "center",
          width: "100%",
          paddingTop: verticalScale(60),
        }}
      >
        Validação de ingressos
      </Text>
    </DefaultContainer>
  );
}
