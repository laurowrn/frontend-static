import { useTheme } from "@/context/ThemeContext";
import { horizontalScale } from "@/helpers/responsiveScaling";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DefaultContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: "center",
        paddingHorizontal:
          Dimensions.get("window").width < 768
            ? horizontalScale(20)
            : horizontalScale(300),
      }}
    >
      {children}
    </SafeAreaView>
  );
}
