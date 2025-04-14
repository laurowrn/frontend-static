import { Fonts } from "@/constants/fonts";
import { horizontalScale, verticalScale } from "@/helpers/responsiveScaling";
import { View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

interface GuestDataCardProps {
  name: string;
  email: string;
  instagram: string;
}
export default function GuestDataCard({
  name,
  email,
  instagram,
}: GuestDataCardProps) {
  const { colors } = useTheme();
  return (
    <Card
      style={{
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
      }}
    >
      <Card.Content style={{ padding: 0, flex: 3, rowGap: verticalScale(5) }}>
        <Text variant="titleMedium" style={{ fontFamily: Fonts.bold }}>
          {name}
        </Text>
        <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
          Email: {email}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text variant="bodySmall" style={{ fontFamily: Fonts.regular }}>
            Instagram: {""}
          </Text>
          <Text
            variant="bodySmall"
            style={{ fontFamily: Fonts.black, color: colors.primary }}
            onPress={() =>
              WebBrowser.openBrowserAsync(`https://instagram.com/${instagram}`)
            }
          >
            @{instagram}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
}
