import { Fonts } from "@/constants/fonts";
import { horizontalScale, verticalScale } from "@/helpers/responsiveScaling";
import { View } from "react-native";
import { Card, IconButton, Text, useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";

interface RequestApprovalCardProps {
  name: string;
  email: string;
  instagram: string;
  onApprove: () => void;
  onReject: () => void;
}
export default function RequestApprovalCard({
  name,
  email,
  instagram,
  onApprove,
  onReject,
}: RequestApprovalCardProps) {
  const { colors } = useTheme();
  return (
    <Card
      style={{
        width: "100%",
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 0,
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
                WebBrowser.openBrowserAsync("https://instagram.com/laur0wn")
              }
            >
              @{instagram}
            </Text>
          </View>
        </Card.Content>
        <Card.Actions
          style={{
            padding: 0,
            flex: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={"close-circle"}
            containerColor={colors.errorContainer}
            iconColor={colors.onErrorContainer}
            mode="contained"
            onPress={onReject}
          />
          <IconButton
            icon={"check"}
            containerColor={colors.primaryContainer}
            iconColor={colors.onPrimaryContainer}
            mode="contained"
            onPress={onApprove}
          />
        </Card.Actions>
      </View>
    </Card>
  );
}
