import { Fonts } from "@/constants/fonts";
import { Dialog, Portal, Text, Button } from "react-native-paper";

interface ErrorDialogProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorDialog({ message, onDismiss }: ErrorDialogProps) {
  return (
    <Portal>
      <Dialog visible={true} onDismiss={onDismiss}>
        <Dialog.Title>Erro</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={{ fontFamily: Fonts.regular }}>
            {message}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Fechar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
