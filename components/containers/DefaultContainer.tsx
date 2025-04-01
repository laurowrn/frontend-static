import { useTheme } from "react-native-paper";
import { horizontalScale } from "@/helpers/responsiveScaling";
import { Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <SafeAreaView
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal:
            Dimensions.get("window").width < 768
              ? horizontalScale(20)
              : horizontalScale(300),
        }}
      >
        {children}
      </SafeAreaView>
    </ScrollView>
  );
}
