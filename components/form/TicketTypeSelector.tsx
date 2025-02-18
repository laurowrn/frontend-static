import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View, Text } from "react-native";

interface TicketTypeSelectorProps {
  style: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    iconColor: string;
    textcolor: string;
    tagBackgroundColor?: string;
    tagTextcolor?: string;
  };
  ticketName: string;
  ticketPrice: string;
  isRestricted?: boolean;
  tagText?: string;
  iconName: keyof typeof Ionicons.glyphMap | undefined;
  onPress: () => void;
}

export default function TicketTypeSelector({
  style,
  onPress,
  iconName,
  isRestricted,
  ticketName,
  ticketPrice,
  tagText,
}: TicketTypeSelectorProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        width: "100%",
        backgroundColor: style.backgroundColor,
        borderRadius: moderateScale(10),
        borderColor: style.borderColor,
        borderWidth: moderateScale(1),
        paddingVertical: verticalScale(8),
        paddingHorizontal: moderateScale(10),
        alignItems: "center",
        gap: moderateScale(10),
      }}
      onPress={onPress}
    >
      <Ionicons name={iconName} size={fontSize(20)} color={style.iconColor} />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          gap: moderateScale(5),
        }}
      >
        <Text
          style={{
            color: style.textColor,
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
            flexShrink: 1,
          }}
        >
          {ticketName}
        </Text>
        {isRestricted && (
          <Text
            style={{
              color: style.tagTextcolor,
              fontFamily: Fonts.black,
              fontSize: fontSize(12),
              backgroundColor: style.tagBackgroundColor,
              paddingVertical: verticalScale(3),
              paddingHorizontal: horizontalScale(6),
              borderRadius: moderateScale(7),
            }}
          >
            {tagText}
          </Text>
        )}
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            color: style.textColor,
            fontFamily: Fonts.bold,
            fontSize: fontSize(15),
          }}
        >
          R$ {ticketPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
