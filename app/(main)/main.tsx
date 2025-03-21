import DefaultContainer from "@/components/containers/DefaultContainer";
import GenericButton from "@/components/GenericButton";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "@/context/ThemeContext";
import { fontSize, horizontalScale } from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Main() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <DefaultContainer>
      <GenericButton
        backgroundColor={colors.primary}
        textColor={colors.onPrimary}
        onPress={() => router.push("/validar")}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            columnGap: horizontalScale(15),
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(22),
              color: colors.onPrimary,
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            Ir para a página de validação de ingressos
          </Text>
          <Ionicons
            name="arrow-forward"
            size={fontSize(24)}
            color={colors.onPrimary}
            style={{ alignSelf: "center", textAlign: "center" }}
          />
        </View>
      </GenericButton>
    </DefaultContainer>
  );
}
