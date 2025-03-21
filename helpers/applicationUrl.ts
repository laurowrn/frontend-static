import { Platform } from "react-native";

const getFrontendUrl = (): string => {
  const appEnv = process.env.EXPO_PUBLIC_APP_ENV || "";
  let frontendUrl: string = "";

  if (appEnv === "DEV") {
    if (Platform.OS === "web") {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/android|iphone|ipad|ipod|mobile/i.test(userAgent)) {
        frontendUrl =
          process.env.EXPO_PUBLIC_DEV_MOBILE_FRONTEND_BASE_URL || "";
      } else {
        frontendUrl =
          process.env.EXPO_PUBLIC_DEV_DESKTOP_FRONTEND_BASE_URL || "";
      }
    }
  } else {
    frontendUrl = process.env.EXPO_PUBLIC_FRONTEND_BASE_URL || "";
  }

  return frontendUrl;
};

const getRedirectUri = (): string => {
  const frontendUrl = getFrontendUrl();

  return `${frontendUrl}${process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_ROUTE}`;
};

const getBackendUrl = (): string => {
  const appEnv = process.env.EXPO_PUBLIC_APP_ENV || "";
  let baseUrl: string = "";

  if (appEnv === "DEV") {
    if (Platform.OS === "web") {
      const userAgent = navigator.userAgent.toLowerCase();
      if (/android|iphone|ipad|ipod|mobile/i.test(userAgent)) {
        baseUrl = process.env.EXPO_PUBLIC_DEV_MOBILE_BACKEND_BASE_URL || "";
      } else {
        baseUrl = process.env.EXPO_PUBLIC_DEV_DESKTOP_BACKEND_BASE_URL || "";
      }
    }
  } else {
    baseUrl = process.env.EXPO_PUBLIC_BACKEND_BASE_URL || "";
  }

  return baseUrl;
};

export const FRONTEND_BASE_URL = getFrontendUrl();
export const BACKEND_BASE_URL = getBackendUrl();
export const GOOGLE_REDIRECT_URI = getRedirectUri();
