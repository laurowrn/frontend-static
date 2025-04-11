import { Surface, TouchableRipple, Text, useTheme } from "react-native-paper";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Image } from "expo-image";
import { Fonts } from "@/constants/fonts";

interface EventCardProps {
  event: {
    name: string;
    startDate: Date;
    imageSource: string;
  };
  address: string;
  onPress?: () => void;
}

export default function EventCard({ event, address, onPress }: EventCardProps) {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <TouchableRipple
      style={{ width: "100%", marginBottom: verticalScale(10) }}
      onPress={onPress}
    >
      <Surface
        elevation={1}
        style={{
          width: "100%",
          borderRadius: moderateScale(10),
          padding: moderateScale(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: horizontalScale(10),
          }}
        >
          <View
            style={{
              width: moderateScale(100),
              height: moderateScale(100),
              overflow: "hidden",
              borderRadius: moderateScale(10),
            }}
          >
            <Image
              style={{ flex: 1, width: "100%" }}
              source={event.imageSource}
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View style={{ rowGap: verticalScale(3), flex: 1 }}>
            <Text style={{ fontSize: fontSize(25), fontFamily: Fonts.bold }}>
              {event.name}
            </Text>

            <Text
              style={{
                fontSize: fontSize(14),
                fontFamily: Fonts.bold,
                color: colors.primary,
              }}
            >
              {`${event.startDate.toLocaleDateString("pt-BR", {
                weekday: "long",
              })}, ${event.startDate.toLocaleDateString("pt-BR", {
                dateStyle: "long",
              })}`}
            </Text>

            <Text
              style={{
                fontSize: fontSize(14),
                fontFamily: Fonts.bold,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {address}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableRipple>
  );
}
