import React from "react";
import {
  View,
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

interface ContainerStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

const generateNumberArray = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) =>
    (start + i).toString().padStart(2, "0")
  );
};

const days = generateNumberArray(1, 31);
const months = generateNumberArray(1, 12);
const currentYear = new Date().getFullYear();
const years = generateNumberArray(currentYear - 100, currentYear);

type BirthdayPickerProps = {
  birthday: string;
  setBirthday: (value: string) => void;
  width?: DimensionValue;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (text: string) => void;
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
    container: ContainerStyleType;
    label?: TextStyle;
    icons: TextStyle;
  };
  testId?: string;
};

const BirthdayPicker: React.FC<BirthdayPickerProps> = ({
  birthday,
  setBirthday,
  width,
  onBlur,
  onFocus,
  onChange,
  leftIcon,
  rightIcon,
  label,
  styles,
  testId,
}) => {
  const { colors } = useTheme();
  const [selectedDay, selectedMonth, selectedYear] = birthday.split("/");

  const handleChange = (newDay: string, newMonth: string, newYear: string) => {
    const updatedBirthday = `${newDay}/${newMonth}/${newYear}`;
    setBirthday(updatedBirthday);
    if (onChange) {
      onChange(updatedBirthday);
    }
  };

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
            selectedValue={selectedDay}
            numberOfLines={1}
            style={[constantStyles.picker, dynamicPickerStyle]}
            onValueChange={(itemValue) =>
              handleChange(itemValue, selectedMonth, selectedYear)
            }
            onBlur={onBlur}
            onFocus={onFocus}
          >
            {days.map((day) => (
              <Picker.Item key={day} label={day} value={day} />
            ))}
          </Picker>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedMonth}
            style={[constantStyles.picker, dynamicPickerStyle]}
            onValueChange={(itemValue) =>
              handleChange(selectedDay, itemValue, selectedYear)
            }
            onBlur={onBlur}
            onFocus={onFocus}
          >
            {months.map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }}>
          <Picker
            selectedValue={selectedYear}
            style={[constantStyles.picker, dynamicPickerStyle]}
            onValueChange={(itemValue) =>
              handleChange(selectedDay, selectedMonth, itemValue)
            }
            onBlur={onBlur}
            onFocus={onFocus}
          >
            {years.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </TouchableOpacity>
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

export default BirthdayPicker;

const constantStyles = StyleSheet.create({
  picker: {
    flex: 1,
    paddingVertical: moderateScale(3),
  },
});
