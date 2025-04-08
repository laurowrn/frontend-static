import DefaultContainer from "@/components/containers/DefaultContainer";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import { Surface, Text, useTheme } from "react-native-paper";
import { View } from "react-native";
import { Fonts } from "@/constants/fonts";
import React from "react";

export default function TicketFormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <Surface
      style={{
        width: "100%",
        borderRadius: moderateScale(10),
        overflow: "hidden",
      }}
      elevation={2}
    >
      <Surface
        elevation={5}
        style={{
          padding: moderateScale(10),
        }}
      >
        <Text style={{ fontFamily: Fonts.semiBold, fontSize: fontSize(20) }}>
          Obter ingressos
        </Text>
      </Surface>
      <View style={{ padding: moderateScale(10) }}>
        <Text style={{ fontFamily: Fonts.regular, fontSize: fontSize(20) }}>
          Bem vindo! Por favor, escolha o tipo de ingresso desejado:
        </Text>
        {children}
      </View>
    </Surface>
  );
}
