import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { View } from "react-native";
import { useTheme, Text, Icon, IconButton } from "react-native-paper";
import { Image } from "expo-image";
import { Fonts } from "@/constants/fonts";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { useRouter } from "expo-router";
import PublicEventPageAppBar from "./EventPageAppBar";

interface EventPageHeaderProps {
  eventId: string;
  eventTitle: string;
  eventImageUrl: string;
  startDate: Date;
  endDate: Date;
  eventLocationName: string;
  eventAddress: string;
  eventLocationUrl: string;
  appBar?: React.ReactNode;
}

export default function EventPageHeader({
  eventId,
  eventTitle,
  eventImageUrl,
  startDate,
  endDate,
  eventLocationName,
  eventAddress,
  eventLocationUrl,
  appBar,
}: EventPageHeaderProps) {
  const { colors, dark } = useTheme();

  return (
    <View style={{ alignItems: "center", rowGap: verticalScale(15) }}>
      {appBar}
      <View
        style={{
          width: moderateScale(300),
          height: moderateScale(300),
          overflow: "hidden",
          borderRadius: moderateScale(10),
        }}
      >
        <Image
          style={{ flex: 1, width: "100%" }}
          source={eventImageUrl}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Text
        style={{
          fontFamily: Fonts.bold,
          textAlign: "center",
          width: "100%",
          fontSize: fontSize(35),
        }}
      >
        {eventTitle}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: horizontalScale(3),
        }}
      >
        <Icon source={"calendar"} size={fontSize(30)} color={colors.primary} />
        <View style={{ rowGap: verticalScale(2) }}>
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(18),
            }}
          >
            {`${startDate.toLocaleDateString("pt-BR", {
              weekday: "long",
            })}, ${startDate.toLocaleDateString("pt-BR", {
              dateStyle: "long",
            })}`}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            {`${startDate.toLocaleTimeString("pt-BR", {
              timeStyle: "short",
            })} - ${endDate.toLocaleTimeString("pt-BR", {
              timeStyle: "short",
            })}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: horizontalScale(3),
        }}
      >
        <Icon
          source={"map-marker"}
          size={fontSize(30)}
          color={colors.primary}
        />
        <View style={{ flex: 7, rowGap: verticalScale(2) }}>
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(18),
            }}
          >
            {eventLocationName}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            {eventAddress}
          </Text>
        </View>
        <IconButton
          icon={"arrow-top-right"}
          size={fontSize(30)}
          iconColor={colors.primary}
          onPress={() => {
            WebBrowser.openBrowserAsync(eventLocationUrl);
          }}
        />
      </View>
    </View>
  );
}
