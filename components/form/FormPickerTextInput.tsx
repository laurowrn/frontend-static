import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TextStyle,
  DimensionValue,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  fontSize,
  horizontalScale,
  moderateScale,
} from "@/helpers/responsiveScaling";
import { useTheme } from "@/context/ThemeContext";
import { Fonts } from "@/constants/fonts";
import { Picker } from "@react-native-picker/picker";

interface TextInputStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

type FormTextInputProps = {
  placeholder?: string;
  value: string;
  currentPickerValue: string;
  width?: DimensionValue;
  maxLength?: number;
  multiline?: boolean;
  numberOfLines?: number;
  editable?: boolean;
  onChangeText?: (text: string) => void;
  onChangePickerValue?: (item: string) => void;
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
    container: TextInputStyleType;
    label?: TextStyle;
    icons: TextStyle;
  };
  testId?: string;
  pickerValues: string[];
};

const FormPickerTextInput: React.FC<FormTextInputProps> = ({
  placeholder,
  value,
  currentPickerValue,
  width,
  maxLength,
  multiline,
  numberOfLines,
  editable,
  onChangeText,
  onChangePickerValue,
  onFocus,
  onBlur,
  secureTextEntry = false,
  leftIcon,
  rightIcon,
  label,
  styles,
  testId,
  pickerValues,
}) => {
  const { colors } = useTheme();
  const dynamicPickerStyle: TextStyle = {
    backgroundColor: styles.container.backgroundColor,
    color: styles.container.color,
    textAlign: "center",
    fontSize: fontSize(16),
    fontFamily: Fonts.semiBold,
    borderColor: styles.container.color,
    borderRadius: moderateScale(10),
    outlineColor: "transparent",
    outline: "none",
  };
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
          styles.container,
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
        <TouchableOpacity style={{ flex: 1 }}>
          <Picker
            selectedValue={currentPickerValue}
            numberOfLines={1}
            style={[constantStyles.picker, dynamicPickerStyle]}
            onValueChange={onChangePickerValue}
            onBlur={onBlur}
            onFocus={onFocus}
          >
            {pickerValues.map((pickerValue: string) => (
              <Picker.Item
                key={pickerValue}
                label={pickerValue}
                value={pickerValue}
              />
            ))}
          </Picker>
        </TouchableOpacity>
        <TextInput
          placeholder={placeholder}
          value={value}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={editable}
          placeholderTextColor={styles.container.color}
          style={[
            {
              flex: 1,
              fontFamily: Fonts.regular,
              fontSize: fontSize(16),
              width: "100%",
              height: "100%",
              paddingVertical: moderateScale(3),
              outline: "none",
              color: styles.container.color,
            },
          ]}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          testID={testId}
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

const constantStyles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});
