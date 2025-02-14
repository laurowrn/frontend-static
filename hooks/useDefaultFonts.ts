import {
  Epilogue_100Thin,
  Epilogue_200ExtraLight,
  Epilogue_300Light,
  Epilogue_400Regular,
  Epilogue_500Medium,
  Epilogue_600SemiBold,
  Epilogue_700Bold,
  Epilogue_800ExtraBold,
  Epilogue_900Black,
  useFonts,
} from "@expo-google-fonts/epilogue";
import { Fonts } from "../constants/fonts";

export function useDefaultFonts() {
  const [fontsLoaded, error] = useFonts({
    [Fonts.thin]: Epilogue_100Thin,
    [Fonts.extraLight]: Epilogue_200ExtraLight,
    [Fonts.light]: Epilogue_300Light,
    [Fonts.regular]: Epilogue_400Regular,
    [Fonts.medium]: Epilogue_500Medium,
    [Fonts.semiBold]: Epilogue_600SemiBold,
    [Fonts.bold]: Epilogue_700Bold,
    [Fonts.extraBold]: Epilogue_800ExtraBold,
    [Fonts.black]: Epilogue_900Black,
  });

  return { fontsLoaded, error };
}
