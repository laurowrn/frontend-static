import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  fontSize,
  verticalScale,
  moderateScale,
  horizontalScale,
} from "@/helpers/responsiveScaling";
import { Fonts } from "@/constants/fonts";

interface GenericButtonProps {
  onPress?: () => void;
  backgroundColor: string;
  textColor: string;
  disabled?: boolean;
  testId?: string;
  children: React.ReactNode;
}

const GenericButton: React.FC<GenericButtonProps> = ({
  onPress,
  backgroundColor,
  textColor,
  disabled,
  testId,
  children,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
      testID={testId}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(12),
    borderRadius: moderateScale(25),
  },
  buttonText: {
    fontFamily: Fonts.semiBold,
    fontSize: fontSize(18),
  },
});

export default GenericButton;
