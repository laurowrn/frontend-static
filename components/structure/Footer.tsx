import {
  fontSize,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { View, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "react-native-paper";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

export default function Footer() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        rowGap: verticalScale(8),
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
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
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          Telefone: (47) 99768-9918
        </Text>
        <Feather
          name="arrow-up-right"
          size={fontSize(16)}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
          color={colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
        onPress={() => {
          WebBrowser.openBrowserAsync(
            "mailto:contato@tikko.com?subject=Dúvida"
          );
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          E-mail: contato@tikko.com
        </Text>
        <Feather
          name="arrow-up-right"
          size={fontSize(16)}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
          color={colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          CNPJ: 58.451.195/0001-76
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          Endereço: Av. Paulista, 1106, Sala 01, Andar 16, Bela Vista, São
          Paulo-SP - 01.310.914
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
        onPress={() => {
          router.push("/termos-e-condicoes");
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          Termos e Condições
        </Text>
        <Feather
          name="arrow-up-right"
          size={fontSize(16)}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
          color={colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
        onPress={() => {
          router.push("/politica-privacidade");
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          Política de Privacidade
        </Text>
        <Feather
          name="arrow-up-right"
          size={fontSize(16)}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
          color={colors.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          columnGap: moderateScale(3),
        }}
        onPress={() => {
          router.push("/sobre");
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            textAlign: "center",
          }}
        >
          Sobre
        </Text>
        <Feather
          name="arrow-up-right"
          size={fontSize(16)}
          style={{
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
          }}
          color={colors.primary}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TikkoIcons name="mark1" size={fontSize(40)} color={colors.primary} />
        </View>
        <Text
          style={{
            color: colors.primary,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
          }}
        >
          © 2025 Tikko
        </Text>
      </View>
    </View>
  );
}
