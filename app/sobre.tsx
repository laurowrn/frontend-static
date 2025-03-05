import DefaultContainer from "@/components/containers/DefaultContainer";
import FormButton from "@/components/form/FormButton";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "@/context/ThemeContext";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
export default function Sobre() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <DefaultContainer>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: horizontalScale(1500),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          Sobre a Tikko
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          A Tikko nasceu com um propósito claro: revolucionar a forma como as
          pessoas vivenciam eventos. Unimos inovação, acessibilidade e
          transparência para criar uma plataforma intuitiva, segura e eficiente
          para organizar eventos e vender ingressos.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Sabemos que cada evento é único, e nosso compromisso é tornar a
          experiência do público e dos organizadores mais simples, confiável e
          inesquecível. Com tecnologia de ponta, garantimos processos ágeis,
          pagamentos seguros e suporte dedicado a cada etapa da jornada.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Seja um festival grandioso, um show exclusivo ou um evento
          corporativo, a Tikko está aqui para conectar experiências a pessoas
          com facilidade e segurança. Viva o seu evento com a Tikko!
        </Text>
        <View style={{ paddingBottom: verticalScale(30) }} />
        <FormButton
          title="Voltar"
          backgroundColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={() => {
            router.back();
          }}
        />
        <View style={{ paddingBottom: verticalScale(30) }} />
      </ScrollView>
    </DefaultContainer>
  );
}
