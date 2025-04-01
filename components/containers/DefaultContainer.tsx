import { useTheme } from "react-native-paper";
import { horizontalScale, verticalScale } from "@/helpers/responsiveScaling";
import { Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultContainer({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  const { colors } = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: colors.background,
        },
        { backgroundColor },
      ]}
    >
      <SafeAreaView
        style={{
          alignItems: "center",
          paddingHorizontal:
            Dimensions.get("window").width < 768
              ? horizontalScale(20)
              : horizontalScale(300),
          paddingVertical: verticalScale(20),
        }}
      >
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
