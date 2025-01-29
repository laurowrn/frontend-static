import React, { createContext, useContext, useState, ReactNode } from "react";
import { colors } from "../constants/colors";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof colors.light | typeof colors.dark;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const deviceTheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(
    deviceTheme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeColors = theme === "light" ? colors.light : colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
