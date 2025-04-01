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
        }}
        variant="titleMedium"
      >
        Sobre o evento
      </Text>
      <Divider />
      <Text
        style={{
          fontFamily: Fonts.regular,
          textAlign: "justify",
        }}
        variant="bodyMedium"
      >
        {description}
      </Text>
      <Divider />
    </View>
  );
}
