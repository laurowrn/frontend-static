import { Fonts } from "@/constants/fonts";
import { useTheme } from "react-native-paper";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  DimensionValue,
  TextStyle,
  InputModeOptions,
} from "react-native";
import FormTextInput from "./FormTextInput";

interface TextInputStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

type FormTextInputProps = {
  placeholder?: string;
  value: string;
  width?: DimensionValue;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  leftIcon?: {
    iconName: keyof typeof Ionicons.glyphMap | undefined;
    onPress?: () => void;
  };
  rightIcon?: {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  };
  label?: string;
  styles: {
    textInputContainer: TextInputStyleType;
    label?: TextStyle;
    icons: TextStyle;
  };
  testId?: string;
  inputMode?: InputModeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: "off" | "email";
  autoCorrect?: boolean;
  autoFocus?: boolean;
};

export default function FormCheckbox({
  placeholder,
  value,
  width,
  maxLength,
  multiline,
  numberOfLines,
  editable,
  onChangeText,
  onFocus,
  onBlur,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  label,
  styles,
  testId,
  inputMode = "none",
  autoCapitalize,
  autoComplete,
  autoCorrect,
  autoFocus,
}: FormTextInputProps) {
  const [isChecked, setIsChecked] = useState(false);
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => setIsChecked(!isChecked)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          columnGap: horizontalScale(10),
          paddingVertical: verticalScale(6),
        }}
      >
        <Ionicons
          key={isChecked ? "checked" : "unchecked"}
          name={isChecked ? "checkmark-circle" : "ellipse-outline"}
          size={fontSize(20)}
          style={{
            textAlign: "center",
            color: isChecked ? colors.primary : colors.onSurface,
          }}
        />
        <Text
          style={{
            textAlign: "center",
            color: colors.onSurface,
            fontFamily: Fonts.semiBold,
            fontSize: fontSize(16),
          }}
        >
          Possuo cupom
        </Text>
      </TouchableOpacity>
      {isChecked && (
        <FormTextInput
          placeholder={placeholder}
          value={value}
          width="100%"
          maxLength={maxLength}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          label={label}
          leftIcon={leftIcon}
          styles={{
            textInputContainer: styles.textInputContainer,
            label: styles.label,
            icons: styles.icons,
          }}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
        />
      )}
    </View>
  );
}
