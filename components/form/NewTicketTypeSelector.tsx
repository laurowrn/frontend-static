import { colors } from "@/constants/colors";
import { Fonts } from "@/constants/fonts";
import {
  moderateScale,
  verticalScale,
  fontSize,
  horizontalScale,
} from "@/helpers/responsiveScaling";
import { useState } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import {
  Surface,
  TouchableRipple,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";

export interface TicketSelectorStyle {
  selector: ViewStyle;
  badge?: TextStyle;
}

interface NewTicketTypeSelectorProps {
  isSelected: boolean;
  onPress: () => void;
  hasBadge?: boolean;
  style: TicketSelectorStyle;
  title: string;
  price: string;
  badgeText: string;
}

export default function NewTicketTypeSelector({
  isSelected,
  onPress,
  hasBadge = false,
  style,
  title,
  price,
  badgeText,
}: NewTicketTypeSelectorProps) {
  const { colors } = useTheme();

  return (
    <Surface
      style={[
        {
          width: "100%",
          borderTopLeftRadius: moderateScale(10),
          borderTopRightRadius: moderateScale(10),
          borderBottomLeftRadius: moderateScale(10),
          borderBottomRightRadius: moderateScale(10),
          overflow: "hidden",
        },
        style.selector,
      ]}
      elevation={3}
    >
      <TouchableRipple
        onPress={() => {
          onPress();
        }}
        style={{
          flex: 1,
          width: "100%",
          paddingVertical: verticalScale(8),
          paddingHorizontal: moderateScale(10),
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            gap: moderateScale(10),
            alignItems: "center",
          }}
        >
          <Icon
            source={isSelected ? "checkbox-outline" : "checkbox-blank-outline"}
            size={20}
          />
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
                fontFamily: Fonts.bold,
                flexShrink: 1,
              }}
              variant="bodyLarge"
            >
              {title}
            </Text>
            {hasBadge && (
              <Text
                style={[
                  {
                    fontFamily: Fonts.black,
                    paddingVertical: verticalScale(3),
                    paddingHorizontal: horizontalScale(6),
                    borderRadius: moderateScale(7),
                    backgroundColor: colors.elevation.level1,
                    color: colors.onSurfaceVariant,
                  },
                  style.badge,
                ]}
                variant="labelMedium"
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
                fontFamily: Fonts.bold,
              }}
              variant="bodyLarge"
            >
              {price}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
}
