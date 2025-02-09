import { useTheme } from "@/context/ThemeContext";
import FormTextInput from "@/components/form/FormTextInput";
import { useState } from "react";
import { FlatList, TouchableOpacity, View, Text, Platform } from "react-native";
import { EMAIL_MAX_LENGTH, NAME_MAX_LENGTH } from "@/constants/validation";
import {
  validateBirthday,
  validateEmail,
  validateName,
} from "@/helpers/validators";
import { Fonts } from "@/constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import BirthdayPicker from "./BirthdayPicker";
import FormButton from "./FormButton";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";

interface FormInputConfig {
  name: string;
  title?: string;
  submit?: () => void;
  placeholder?: string;
  validator?: (value: string) => { isValid: boolean; errorMessage: string };
  iconName?: keyof typeof Ionicons.glyphMap | undefined;
  type: "text-input" | "birthday-picker" | "submit-button";
  maxLength?: number;
}

interface TextInputStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

interface UserInfoFormProps {
  ticketType?: "masculino" | "feminino" | null | undefined;
}

export default function UserInfoForm({ ticketType }: UserInfoFormProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const [birthday, setBirthday] = useState<string>("01/01/2000");

  const blurredTextInputStyle: TextInputStyleType = {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.surfaceVariant,
    color: colors.onSurfaceVariant,
  };

  const focusedTextInputStyle: TextInputStyleType = {
    backgroundColor: colors.primary,
    borderColor: colors.onPrimary,
    color: colors.onPrimary,
  };

  const errorTextInputStyle: TextInputStyleType = {
    backgroundColor: colors.error,
    borderColor: colors.onError,
    color: colors.onError,
  };

  const blurredIconStyle = { color: colors.onSurfaceVariant };
  const focusedIconStyle = { color: colors.onPrimary };
  const errorIconStyle = { color: colors.onError };

  const formInputs: FormInputConfig[] = [
    {
      type: "text-input",
      name: "email",
      placeholder: "Email",
      validator: validateEmail,
      iconName: "at",
      maxLength: EMAIL_MAX_LENGTH,
    },
    {
      type: "text-input",
      name: "name",
      placeholder: "Nome",
      validator: validateName,
      maxLength: NAME_MAX_LENGTH,
      iconName: "person",
    },
    {
      type: "birthday-picker",
      name: "birthday",
      placeholder: "Data de nascimento",
      validator: validateBirthday,
      iconName: "calendar",
    },
    {
      type: "submit-button",
      name: "buy",
      title: "Comprar",
      submit: async () => {
        router.push(
          `/confirm?email=${formState["email"].value}&name=${formState["name"].value}&ticketType=${ticketType}&birthday=${birthday}`
        );
      },
      validator: validateBirthday,
    },
  ];

  const [formState, setFormState] = useState(
    formInputs.reduce((acc, input) => {
      acc[input.name] = {
        value: "",
        isValid: true,
        errorMessage: "",
        isFocused: false,
      };
      return acc;
    }, {} as Record<string, { value: string; isValid: boolean; errorMessage: string; isFocused: boolean }>)
  );

  const handleTextChange = (
    name: string,
    text: string,
    validator: FormInputConfig["validator"]
  ) => {
    const { isValid, errorMessage } = validator
      ? validator(text)
      : { isValid: true, errorMessage: "" };

    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value: text,
        isValid,
        errorMessage: isValid ? "" : errorMessage,
      },
    }));
  };

  const handleFocus = (name: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        isFocused: true,
      },
    }));
  };

  const handleBlur = (name: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        isFocused: false,
      },
    }));
  };

  const getTextInputStyle = (isFocused: boolean, isValid: boolean) => {
    if (!isValid) return errorTextInputStyle;
    return isFocused ? focusedTextInputStyle : blurredTextInputStyle;
  };

  const getIconStyle = (isFocused: boolean, isValid: boolean) => {
    if (!isValid) return errorIconStyle;
    return isFocused ? focusedIconStyle : blurredIconStyle;
  };

  const renderFormInput = ({ item }: { item: FormInputConfig }) => {
    const {
      name,
      placeholder,
      iconName,
      validator,
      type,
      maxLength,
      title,
      submit,
    } = item;
    const { value, isValid, errorMessage, isFocused } = formState[name];

    if (type === "birthday-picker") {
      return (
        <BirthdayPicker
          birthday={birthday}
          setBirthday={setBirthday}
          leftIcon={{ iconName }}
          onFocus={() => handleFocus(name)}
          onBlur={() => handleBlur(name)}
          onChange={(text) => handleTextChange(name, text, validator)}
          label={errorMessage}
          styles={{
            container: getTextInputStyle(isFocused, isValid),
            label: {
              textAlign: "left",
              fontFamily: Fonts.regular,
              color: colors.error,
            },
            icons: getIconStyle(isFocused, isValid),
          }}
        />
      );
    } else if (type === "submit-button") {
      return (
        <FormButton
          title={title}
          onPress={submit}
          backgroundColor={colors.primary}
          textColor={colors.onPrimary}
        />
      );
    } else {
      return (
        <FormTextInput
          key={name}
          placeholder={placeholder}
          value={value}
          width="100%"
          maxLength={maxLength}
          onChangeText={(text) => handleTextChange(name, text, validator)}
          onFocus={() => handleFocus(name)}
          onBlur={() => handleBlur(name)}
          label={errorMessage}
          leftIcon={{ iconName }}
          styles={{
            textInputContainer: getTextInputStyle(isFocused, isValid),
            label: {
              textAlign: "left",
              fontFamily: Fonts.regular,
              color: colors.error,
            },
            icons: getIconStyle(isFocused, isValid),
          }}
          testId={`${name}-input`}
        />
      );
    }
  };

  return (
    <View style={{ width: "100%", rowGap: verticalScale(8) }}>
      <Text
        style={{
          color: colors.onBackground,
          fontFamily: Fonts.regular,
          fontSize: fontSize(16),
          flex: 1,
        }}
      >
        Preencha seus dados:{" "}
      </Text>
      <FlatList
        data={formInputs}
        keyExtractor={(item) => item.name}
        renderItem={renderFormInput}
        contentContainerStyle={{ gap: verticalScale(8) }}
      />
    </View>
  );
}
