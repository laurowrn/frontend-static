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
      <Dialog visible={true} onDismiss={() => router.replace("/")}>
        <Dialog.Title>Erro</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => router.replace("/")}>Fechar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
