import {
  Divider,
  IconButton,
  Menu,
  Portal,
  Snackbar,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { fontSize, moderateScale } from "@/helpers/responsiveScaling";
import { useState } from "react";
import { useRouter } from "expo-router";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import * as WebBrowser from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import { FRONTEND_BASE_URL } from "@/helpers/applicationUrl";
import { View } from "react-native";

interface PublicEventPageAppBarProps {
  eventId: string;
  left: React.ReactNode;
}

export default function PublicEventPageAppBar({
  eventId,
  left,
}: PublicEventPageAppBarProps) {
  const { colors } = useTheme();
  const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
  const openMenu = () => setIsShareMenuVisible(true);
  const closeMenu = () => setIsShareMenuVisible(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);
  const onToggleCopySnackbar = () =>
    setIsCopySnackbarVisible(!isCopySnackbarVisible);
  const onDismissCopySnackbar = () => setIsCopySnackbarVisible(false);
  const router = useRouter();

  return (
    <View style={{ width: "100%" }}>
      <Portal>
        <Snackbar
          visible={isCopySnackbarVisible}
          onDismiss={onDismissCopySnackbar}
          action={{
            label: "Fechar",
            onPress: onDismissCopySnackbar,
          }}
        >
          Link copiado com sucesso!
        </Snackbar>
      </Portal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {left}
        <Menu
          visible={isShareMenuVisible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon={"share-variant-outline"}
              size={fontSize(35)}
              iconColor={colors.primary}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            leadingIcon="whatsapp"
            onPress={() => {
              WebBrowser.openBrowserAsync(
                `https://api.whatsapp.com/send?text=${FRONTEND_BASE_URL}/events/${eventId}`
              );
              closeMenu();
            }}
            title="Whatsapp"
          />
          <Menu.Item
            leadingIcon="facebook"
            onPress={() => {
              WebBrowser.openBrowserAsync(
                `https://www.facebook.com/sharer/sharer.php?u=${FRONTEND_BASE_URL}/events/${eventId}`
              );
              closeMenu();
            }}
            title="Facebook"
          />
          <Menu.Item
            leadingIcon="arrow-top-right-bold-outline"
            onPress={() => {
              WebBrowser.openBrowserAsync(
                `https://t.me/share/url?url=${FRONTEND_BASE_URL}/events/${eventId}`
              );
              closeMenu();
            }}
            title="Telegram"
          />
          <Divider />
          <Menu.Item
            leadingIcon="content-copy"
            onPress={() => {
              Clipboard.setStringAsync(
                `${FRONTEND_BASE_URL}/events/${eventId}`
              );
              closeMenu();
              onToggleCopySnackbar();
            }}
            title="Copiar link"
          />
        </Menu>
      </View>
    </View>
  );
}
