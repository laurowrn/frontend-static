import { Fonts } from "@/constants/fonts";
import { Dialog, Portal, useTheme, Text, Button } from "react-native-paper";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, useLocalSearchParams, useRouter } from "expo-router";

export default function Error() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{
    message?: string;
  }>();
  const { message } = params;
  return (
    <Portal>
      <Dialog visible={true} onDismiss={() => {}}>
        <Dialog.Title>Erro</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              router.back();
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
    // <Animated.View
    //   entering={FadeIn}
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     backgroundColor: "#000000d0",
    //   }}
    // >
    //   <Pressable
    //     style={StyleSheet.absoluteFill}
    //     onPress={() => router.back()}
    //   />
    //   <Animated.View
    //     entering={FadeInDown}
    //     style={{
    //       width: "65%",
    //       height: "20%",
    //       borderRadius: moderateScale(10),
    //       borderWidth: moderateScale(1),
    //       borderColor: colors.errorContainer,
    //       alignItems: "center",
    //       justifyContent: "center",
    //       backgroundColor: colors.error,
    //     }}
    //   >
    //     <Text
    //       style={{
    //         fontFamily: Fonts.bold,
    //         fontSize: fontSize(16),
    //         textAlign: "center",
    //         color: colors.onError,
    //       }}
    //     >
    //       {message}
    //     </Text>
    //     <TouchableOpacity
    //       style={{
    //         position: "absolute",
    //         top: moderateScale(10),
    //         right: moderateScale(10),
    //       }}
    //       onPress={() => router.back()}
    //     >
    //       <Ionicons
    //         name="close"
    //         size={moderateScale(24)}
    //         style={{ color: colors.onError }}
    //       />
    //     </TouchableOpacity>
    //   </Animated.View>
    // </Animated.View>
  );
}
