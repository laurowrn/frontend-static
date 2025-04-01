import { Fonts } from "@/constants/fonts";
import { useTheme } from "react-native-paper";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, {
  BounceIn,
  FadeIn,
  FadeInDown,
  SlideInDown,
} from "react-native-reanimated";

export default function Error() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    message?: string;
  }>();
  const { message } = params;
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000d0",
      }}
    >
      <Pressable
        style={StyleSheet.absoluteFill}
        onPress={() => router.back()}
      />
      <Animated.View
        entering={FadeInDown}
        style={{
          width: "65%",
          height: "20%",
          borderRadius: moderateScale(10),
          borderWidth: moderateScale(1),
          borderColor: colors.errorContainer,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.error,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: fontSize(16),
            textAlign: "center",
            color: colors.onError,
          }}
        >
          {message}
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: moderateScale(10),
            right: moderateScale(10),
          }}
          onPress={() => router.back()}
        >
          <Ionicons
            name="close"
            size={moderateScale(24)}
            style={{ color: colors.onError }}
          />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}
