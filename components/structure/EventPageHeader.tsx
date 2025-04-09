import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { TikkoIcons } from "@/hooks/useDefaultFonts";
import { View } from "react-native";
import {
  useTheme,
  Text,
  Icon,
  IconButton,
  Menu,
  Button,
  Divider,
  Snackbar,
  Portal,
} from "react-native-paper";
import { Image } from "expo-image";
import { Fonts } from "@/constants/fonts";
import * as WebBrowser from "expo-web-browser";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { FRONTEND_BASE_URL } from "@/helpers/applicationUrl";

interface EventPageHeaderProps {
  eventId: string;
  eventTitle: string;
  eventImageUrl: string;
  startDate: Date;
  endDate: Date;
  eventLocationName: string;
  eventAddress: string;
  eventLocationUrl: string;
}

export default function EventPageHeader({
  eventId,
  eventTitle,
  eventImageUrl,
  startDate,
  endDate,
  eventLocationName,
  eventAddress,
  eventLocationUrl,
}: EventPageHeaderProps) {
  const { colors, dark } = useTheme();
  const [isShareMenuVisible, setIsShareMenuVisible] = useState(false);
  const openMenu = () => setIsShareMenuVisible(true);
  const closeMenu = () => setIsShareMenuVisible(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);
  const onToggleCopySnackbar = () =>
    setIsCopySnackbarVisible(!isCopySnackbarVisible);
  const onDismissCopySnackbar = () => setIsCopySnackbarVisible(false);

  return (
    <View style={{ alignItems: "center", rowGap: verticalScale(15) }}>
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
        <TikkoIcons name="logo1" size={fontSize(40)} color={colors.primary} />
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
      <View
        style={{
          width: moderateScale(300),
          height: moderateScale(300),
          overflow: "hidden",
          borderRadius: moderateScale(10),
        }}
      >
        <Image
          style={{ flex: 1, width: "100%" }}
          source={eventImageUrl}
          contentFit="cover"
          transition={1000}
        />
      </View>
      <Text
        style={{
          fontFamily: Fonts.bold,
          textAlign: "center",
          width: "100%",
          fontSize: fontSize(35),
        }}
      >
        {eventTitle}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: horizontalScale(3),
        }}
      >
        <Icon source={"calendar"} size={fontSize(30)} color={colors.primary} />
        <View style={{ rowGap: verticalScale(2) }}>
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(18),
            }}
          >
            {`${startDate.toLocaleDateString("pt-BR", {
              weekday: "long",
            })}, ${startDate.toLocaleDateString("pt-BR", {
              dateStyle: "long",
            })}`}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            {`${startDate.toLocaleTimeString("pt-BR", {
              timeStyle: "short",
            })} - ${endDate.toLocaleTimeString("pt-BR", {
              timeStyle: "short",
            })}`}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: horizontalScale(3),
        }}
      >
        <Icon
          source={"map-marker"}
          size={fontSize(30)}
          color={colors.primary}
        />
        <View style={{ flex: 7, rowGap: verticalScale(2) }}>
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: fontSize(18),
            }}
          >
            {eventLocationName}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: fontSize(14),
            }}
          >
            {eventAddress}
          </Text>
        </View>
        <IconButton
          icon={"arrow-top-right"}
          size={fontSize(30)}
          iconColor={colors.primary}
          onPress={() => {
            WebBrowser.openBrowserAsync(eventLocationUrl);
          }}
        />
      </View>
    </View>
  );
}
