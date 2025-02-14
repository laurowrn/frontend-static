import {
  Urbanist_100Thin,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
  useFonts,
} from "@expo-google-fonts/urbanist";
import { Fonts } from "../constants/fonts";
// Import the createIconSetFromFontello method
import createIconSetFromFontello from "@expo/vector-icons/createIconSetFromFontello";

// Import the config file
import fontelloConfig from "../fontello/config.json";

// Both the font name and files exported from Fontello are most likely called "fontello".
// Ensure this is the `fontname.ttf` and not the file path.
export const TikkoIcons = createIconSetFromFontello(
  fontelloConfig,
  "fontello",
  "fontello.ttf"
);

export function useDefaultFonts() {
  const [fontsLoaded, error] = useFonts({
    [Fonts.thin]: Urbanist_100Thin,
    [Fonts.extraLight]: Urbanist_200ExtraLight,
    [Fonts.light]: Urbanist_300Light,
    [Fonts.regular]: Urbanist_400Regular,
    [Fonts.medium]: Urbanist_500Medium,
    [Fonts.semiBold]: Urbanist_600SemiBold,
    [Fonts.bold]: Urbanist_700Bold,
    [Fonts.extraBold]: Urbanist_800ExtraBold,
    [Fonts.black]: Urbanist_900Black,
    Fontello: require("../fontello/font/fontello.ttf"),
  });

  return { fontsLoaded, error };
}
