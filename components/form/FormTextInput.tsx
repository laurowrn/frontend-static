import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextStyle,
  DimensionValue,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  fontSize,
  horizontalScale,
  moderateScale,
} from "@/helpers/responsiveScaling";
import { useTheme } from "@/context/ThemeContext";
import { Fonts } from "@/constants/fonts";

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
};

const FormTextInput: React.FC<FormTextInputProps> = ({
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
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ width: width || "100%" }}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            borderWidth: moderateScale(1),
            columnGap: horizontalScale(5),
            padding: moderateScale(10),
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
        <TextInput
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          placeholderTextColor={styles.textInputContainer.color}
          style={[
            {
              flex: 1,
              fontFamily: Fonts.regular,
              fontSize: fontSize(16),
              width: "100%",
              height: "100%",
              paddingVertical: moderateScale(3),
              outline: "none",
              color: styles.textInputContainer.color,
            },
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          testID={testId}
          inputMode="email"
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

export default FormTextInput;
