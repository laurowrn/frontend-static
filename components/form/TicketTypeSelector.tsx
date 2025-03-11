import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { Divider } from "react-native-paper";
import { useState } from "react";

interface TicketTypeSelectorProps {
  style: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    iconColor: string;
    badgeBackgroundColor?: string;
    badgeTextcolor?: string;
  };
  ticketName: string;
  ticketPrice: string;
  hasBadge?: boolean;
  badgeText?: string;
  iconName: keyof typeof Ionicons.glyphMap | undefined;
  onPress: () => void;
  expandable?: boolean;
  expandedList?: ListItem[];
}

export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  quantity: string;
  hasTopDivider?: boolean;
  hasBottomDivider?: boolean;
}

export default function TicketTypeSelector({
  style,
  onPress,
  iconName,
  hasBadge,
  ticketName,
  ticketPrice,
  badgeText,
  expandable = false,
  expandedList,
}: TicketTypeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderItem = ({ item }: { item: ListItem }) => (
    <View>
      {item.hasTopDivider && <Divider style={{ backgroundColor: "gray" }} />}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: verticalScale(5),
          }}
        >
          <Text
            style={{
              color: style.textColor,
              fontFamily: Fonts.bold,
              fontSize: fontSize(13),
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: style.textColor,
              fontFamily: Fonts.regular,
              fontSize: fontSize(12),
            }}
          >
            {item.subtitle}
          </Text>
        </View>
        <Text
          style={{
            color: style.textColor,
            fontFamily: Fonts.bold,
            fontSize: fontSize(15),
          }}
        >
          {item.quantity}
        </Text>
      </View>
      {item.hasBottomDivider && <Divider style={{ backgroundColor: "gray" }} />}
    </View>
  );

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          width: "100%",
          backgroundColor: style.backgroundColor,
          borderTopLeftRadius: moderateScale(10),
          borderTopRightRadius: moderateScale(10),
          borderBottomLeftRadius: isExpanded ? 0 : moderateScale(10),
          borderBottomRightRadius: isExpanded ? 0 : moderateScale(10),
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
          {hasBadge && (
            <Text
              style={{
                color: style.badgeTextcolor,
                fontFamily: Fonts.black,
                fontSize: fontSize(12),
                backgroundColor: style.badgeBackgroundColor,
                paddingVertical: verticalScale(3),
                paddingHorizontal: horizontalScale(6),
                borderRadius: moderateScale(7),
              }}
            >
              {badgeText}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: moderateScale(10),
          }}
        >
          <Text
            style={{
              color: style.textColor,
              fontFamily: Fonts.bold,
              fontSize: fontSize(15),
            }}
          >
            R$ {ticketPrice}
          </Text>
          {expandable && (
            <TouchableOpacity
              onPress={() => setIsExpanded(!isExpanded)}
              style={{ paddingVertical: verticalScale(5) }}
            >
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={fontSize(20)}
                color={style.iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>

      {expandable && isExpanded && (
        <View
          style={{
            backgroundColor: style.backgroundColor,
            borderBottomLeftRadius: moderateScale(10),
            borderBottomRightRadius: moderateScale(10),
            borderColor: style.borderColor,
            borderWidth: moderateScale(1),
            borderTopWidth: 0,
            padding: moderateScale(10),
          }}
        >
          <FlatList
            data={expandedList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      )}
    </View>
  );
}
