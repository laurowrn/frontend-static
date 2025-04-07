import { ActivityIndicator, Button, useTheme } from "react-native-paper";
import { horizontalScale, verticalScale } from "@/helpers/responsiveScaling";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { getColors } from "react-native-image-colors";
import { WebImageColors } from "react-native-image-colors/build/types";
import { useEffect, useState } from "react";

export default function EventPageContainer({
  children,
  backgroundColor,
}: {
  children: React.ReactNode;
  backgroundColor?: string;
}) {
  const { colors } = useTheme();
  const [colorList, setColorList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchColors = async () => {
      const image = "https://i.ibb.co/PGM4GCwW/event-image.jpg";
      const response = await getColors(image, {
        fallback: "#000000",
      });

      if (response.platform === "web") {
        const resp = response as WebImageColors;
        const newColorList = [
          // resp.dominant,
          resp.vibrant,
          resp.lightVibrant || "#CCCCCC",
          // resp.darkVibrant || "#333333",
          // resp.muted || "#666666",
          // resp.lightMuted || "#999999",
          resp.darkMuted || "#222222",
          colors.backdrop,
          colors.background,
        ];
        setColorList(newColorList);
      }

      setIsLoading(false);
    };

    fetchColors();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.scrollView,
        { backgroundColor: backgroundColor || colors.background },
      ]}
      contentContainerStyle={styles.contentContainer}
    >
      <LinearGradient
        locations={[0, 0.1, 0.2, 0.35, 1]}
        colors={
          colorList.length >= 2
            ? (colorList as [string, string, ...string[]])
            : [colors.background, colors.background, colors.background]
        }
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
          {isLoading ? <ActivityIndicator /> : children}
        </SafeAreaView>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  gradient: {
    minHeight: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal:
      Dimensions.get("window").width < 768
        ? horizontalScale(20)
        : horizontalScale(300),
    paddingVertical: verticalScale(20),
  },
});
