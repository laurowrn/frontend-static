import { Fonts } from "@/constants/fonts";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { View } from "react-native";
import { Divider, Text, useTheme } from "react-native-paper";

interface EventPageDescriptionProps {
  description: string;
}

export default function EventPageDescription({
  description,
}: EventPageDescriptionProps) {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", rowGap: verticalScale(10) }}>
      <Text
        style={{
          fontFamily: Fonts.regular,
          fontSize: fontSize(20),
        }}
      >
        Sobre o evento
      </Text>
      <Divider />
      <Text
        style={{
          fontFamily: Fonts.regular,
          textAlign: "justify",
          fontSize: fontSize(15),
        }}
      >
        {description}
      </Text>
      <Divider />
    </View>
  );
}
