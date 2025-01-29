import { Dimensions, PixelRatio } from "react-native";
import { ViewStyle, TextStyle } from "react-native";

const MOBILE_BREAKPOINT = 768;
const MOBILE_BASE_WIDTH = 375;
const MOBILE_BASE_HEIGHT = 812;
const DESKTOP_BASE_WIDTH = 1440;
const DESKTOP_BASE_HEIGHT = 900;
const MOBILE_FONT_SCALE = 1;
const DESKTOP_FONT_SCALE = 1.2;
const DEFAULT_MODERATE_SCALE_FACTOR = 0.5;

const { width, height }: { width: number; height: number } =
  Dimensions.get("window");
const isMobile: boolean = width < MOBILE_BREAKPOINT;
const guidelineBaseWidth: number = isMobile
  ? MOBILE_BASE_WIDTH
  : DESKTOP_BASE_WIDTH;
const guidelineBaseHeight: number = isMobile
  ? MOBILE_BASE_HEIGHT
  : DESKTOP_BASE_HEIGHT;
export const horizontalScale = (size: number): number =>
  (width / guidelineBaseWidth) * size;
export const verticalScale = (size: number): number =>
  (height / guidelineBaseHeight) * size;
export const moderateScale = (
  size: number,
  factor: number = DEFAULT_MODERATE_SCALE_FACTOR
): number => size + (horizontalScale(size) - size) * factor;
export const fontSize = (size: number): number => {
  const fontScaleFactor: number = isMobile
    ? MOBILE_FONT_SCALE
    : DESKTOP_FONT_SCALE;
  return moderateScale(size) * fontScaleFactor;
};
