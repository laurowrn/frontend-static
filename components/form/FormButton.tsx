import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  fontSize,
  verticalScale,
  moderateScale,
} from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";

interface FormButtonProps {
  title?: string;
  onPress?: () => void;
  backgroundColor: string;
  textColor: string;
  disabled?: boolean;
  testId?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  disabled,
  testId,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
      testID={testId}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: verticalScale(45),
    borderRadius: moderateScale(25),
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: fontSize(18),
  },
});

export default FormButton;
