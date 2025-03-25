import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextStyle,
  DimensionValue,
  InputModeOptions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { useTheme } from "react-native-paper";
import { Fonts } from "@/constants/fonts";
import { Picker } from "@react-native-picker/picker";
import { acceptedCountryCodes } from "@/constants/validation";

interface TextInputStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

type FormPickerTextInputProps = {
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

const FormPickerTextInput: React.FC<FormPickerTextInputProps> = ({
  placeholder,
  value = "+55",
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
}) => {
  // Extract country code from value or default to "+55"
  const getInitialCountryCode = (val: string) => {
    const foundCode = acceptedCountryCodes.find((code) => val.startsWith(code));
    return foundCode || "+55";
  };

  const initialCountryCode = getInitialCountryCode(value);
  const initialNumber = value.replace(initialCountryCode, ""); // Extract the rest of the number

  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [number, setNumber] = useState(initialNumber);

  // Ensure value updates properly when the country code is changed
  const handlePickerChange = (selectedCountryCode: string) => {
    setCountryCode(selectedCountryCode);
    onChangeText && onChangeText(selectedCountryCode + number);
  };

  // Ensure number updates properly when text is changed
  const handleTextChange = (text: string) => {
    setNumber(text);
    onChangeText && onChangeText(countryCode + text);
  };

  // Fix: Update state when `value` changes externally
  useEffect(() => {
    const newCountryCode = getInitialCountryCode(value);
    const newNumber = value.replace(newCountryCode, "");
    setCountryCode(newCountryCode);
    setNumber(newNumber);
  }, [value]); // Update when `value` changes

  const dynamicPickerStyle: TextStyle = {
    backgroundColor: styles.textInputContainer.backgroundColor,
    color: styles.textInputContainer.color,
    textAlign: "center",
    borderColor: styles.textInputContainer.color,
    borderRadius: moderateScale(10),
    outlineColor: "transparent",
    outline: "none",
  };
  const { colors } = useTheme();
  return (
    <View style={{ width: width || "100%" }}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: moderateScale(1),
            columnGap: horizontalScale(5),
            padding: moderateScale(8),
            borderRadius: moderateScale(14),
            width: "100%",
          },
          styles.textInputContainer,
        ]}
      >
        {leftIcon?.onPress ? (
          <TouchableOpacity onPress={leftIcon.onPress}>
            <Ionicons
              name={leftIcon.iconName}
              size={moderateScale(20)}
              style={[styles.icons]}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name={leftIcon?.iconName}
            size={moderateScale(20)}
            style={[styles.icons]}
          />
        )}
        <TouchableOpacity>
          <Picker
            selectedValue={countryCode}
            numberOfLines={1}
            style={[
              {
                flex: 1,
                paddingVertical: verticalScale(5),
                paddingHorizontal: horizontalScale(5),
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                fontSize: fontSize(15),
                fontFamily: Fonts.bold,
              },
              dynamicPickerStyle,
            ]}
            onBlur={onBlur}
            onFocus={onFocus}
            onValueChange={handlePickerChange}
          >
            {acceptedCountryCodes.map((countryCode) => (
              <Picker.Item
                key={countryCode}
                label={countryCode}
                value={countryCode}
              />
            ))}
          </Picker>
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          value={number}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          placeholderTextColor={styles.textInputContainer.color}
          style={[
            {
              flex: 1,
              fontFamily: Fonts.regular,
              fontSize: fontSize(15),
              width: "100%",
              height: "100%",
              paddingVertical: moderateScale(3),
              outline: "none",
              color: styles.textInputContainer.color,
            },
          ]}
          onChangeText={handleTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          testID={testId}
          inputMode={inputMode}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          autoFocus={autoFocus}
        />
        {rightIcon?.onPress ? (
          <TouchableOpacity onPress={rightIcon.onPress}>
            <Ionicons
              name={rightIcon.iconName}
              size={moderateScale(20)}
              style={[styles.icons]}
            />
          </TouchableOpacity>
        ) : (
          <Ionicons
            name={rightIcon?.iconName}
            size={moderateScale(20)}
            style={[styles.icons]}
          />
        )}
      </View>
      {label && (
        <Text style={[styles.label]} testID={`${testId}-label`}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default FormPickerTextInput;
