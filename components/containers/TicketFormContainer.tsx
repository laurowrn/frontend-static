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
        <Text style={{ fontFamily: Fonts.semiBold }} variant="titleMedium">
          Obter ingressos
        </Text>
      </Surface>
      <View style={{ padding: moderateScale(10) }}>
        <Text style={{ fontFamily: Fonts.regular }} variant="titleMedium">
          Bem vindo! Por favor, escolha o tipo de ingresso desejado:
        </Text>
        {children}
      </View>
    </Surface>
  );
}
