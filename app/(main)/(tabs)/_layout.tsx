import {
  fontSize,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import {
  Icon,
  IconButton,
  Surface,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Fonts } from "@/constants/fonts";

export default function TabLayout() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            ...styles.tabBarContainer,
            backgroundColor: colors.background,
            paddingBottom: insets.bottom ? insets.bottom : verticalScale(10),
            paddingTop: verticalScale(10),
            height: insets.bottom
              ? verticalScale(80) + insets.bottom
              : verticalScale(80),
            borderColor: colors.elevation.level2,
            borderWidth: moderateScale(1),
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.onSurfaceDisabled,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            tabBarLabelStyle: { ...styles.tabBarLabelStyle },
            title: "Explorar",
            tabBarIcon: ({ color }) => (
              <Icon size={28} source={"compass"} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="my-events"
          options={{
            tabBarLabelStyle: { ...styles.tabBarLabelStyle },
            title: "Meus eventos",
            tabBarIcon: ({ color }) => (
              <Icon
                size={28}
                source={"hand-back-right-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopRightRadius: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
  },
  tabBarLabelStyle: { fontFamily: Fonts.semiBold, fontSize: fontSize(11) },
});
