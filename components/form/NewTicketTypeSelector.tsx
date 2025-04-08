import { Fonts } from "@/constants/fonts";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
  fontSize,
} from "@/helpers/responsiveScaling";
import { TextStyle, View, ViewStyle } from "react-native";
import {
  Surface,
  TouchableRipple,
  Text,
  useTheme,
  Checkbox,
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
      mode="flat"
      elevation={5}
    >
      <TouchableRipple
        onPress={() => {
          onPress();
        }}
        style={{
          flex: 1,
          width: "100%",
          paddingVertical: verticalScale(8),
          paddingHorizontal: horizontalScale(5),
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
          <Checkbox status={isSelected ? "checked" : "unchecked"} />
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
                fontSize: fontSize(14),
              }}
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
                    fontSize: fontSize(11),
                  },
                  style.badge,
                ]}
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
                fontSize: fontSize(14),
              }}
            >
              {price}
            </Text>
          </View>
        </View>
      </TouchableRipple>
    </Surface>
  );
}
