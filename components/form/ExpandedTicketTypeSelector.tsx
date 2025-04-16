import { Fonts } from "@/constants/fonts";
import formatMoney from "@/helpers/formatMoney";
import {
  moderateScale,
  verticalScale,
  horizontalScale,
  fontSize,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { FlatList, TextStyle, View, ViewStyle } from "react-native";
import {
  Surface,
  TouchableRipple,
  Text,
  useTheme,
  Checkbox,
  IconButton,
  Divider,
} from "react-native-paper";

export interface TicketSelectorStyle {
  selector: ViewStyle;
  badge?: TextStyle;
}

export interface ListItem {
  id: string;
  title: string;
  subtitle: string;
  quantity: string;
}

interface ExpandedTicketTypeSelectorProps {
  isSelected: boolean;
  onPress: () => void;
  hasBadge?: boolean;
  style: TicketSelectorStyle;
  title: string;
  price: string;
  badgeText: string;
  sublist: string[];
}

export default function ExpandedTicketTypeSelector({
  isSelected,
  onPress,
  hasBadge = false,
  style,
  title,
  price,
  badgeText,
  sublist,
}: ExpandedTicketTypeSelectorProps) {
  const { colors } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const renderItem = ({ item }: { item: ListItem }) => (
    <View>
      <Divider style={{ backgroundColor: "gray" }} />
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
              fontFamily: Fonts.bold,
              fontSize: fontSize(14),
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: fontSize(11),
            }}
          >
            {item.subtitle}
          </Text>
        </View>
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: fontSize(14),
          }}
        >
          {item.quantity}
        </Text>
      </View>
    </View>
  );
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
        <View>
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
                  fontSize: fontSize(18),
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
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: fontSize(16),
                }}
              >
                {price}
              </Text>
            </View>
            <IconButton
              icon={isExpanded ? "chevron-up" : "chevron-down"}
              onPress={() => setIsExpanded(!isExpanded)}
              size={fontSize(20)}
              animated={true}
              style={{ padding: 0, margin: 0 }}
            />
          </View>
          {isExpanded && (
            <Surface
              style={{
                borderBottomLeftRadius: moderateScale(10),
                borderBottomRightRadius: moderateScale(10),
                padding: moderateScale(10),
                backgroundColor: style.selector.backgroundColor,
              }}
              elevation={5}
              mode="flat"
            >
              <FlatList
                data={[
                  {
                    id: "1",
                    title: "Limite de ingressos masculinos",
                    subtitle: "Quantidade limite de ingressos masculinos",
                    quantity: sublist[0],
                  },
                  {
                    id: "2",
                    title: "Limite de ingressos femininos",
                    subtitle: "Quantidade limite de ingressos femininos",
                    quantity: sublist[1],
                  },
                  {
                    id: "3",
                    title: "Preço",
                    subtitle: `Valor total do produto ${formatMoney(
                      Number(sublist[2])
                    )}\nBônus de ${formatMoney(
                      Number(sublist[2]) / 2
                    )} em consumo`,
                    quantity: `${formatMoney(Number(sublist[2]))}`,
                  },
                ]}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </Surface>
          )}
        </View>
      </TouchableRipple>
    </Surface>
  );
}
