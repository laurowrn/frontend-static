import { useTheme } from "@/context/ThemeContext";
import FormTextInput from "@/components/form/FormTextInput";
import { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  InputModeOptions,
} from "react-native";
import {
  AGE_MAX_LENGTH,
  CUPOM_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  INSTAGRA_MAX_LENGTH,
  MOBILE_NUMBER_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "@/constants/validation";
import {
  validateAge,
  validateBirthday,
  validateEmail,
  validateInstagram,
  validateMobileNumber,
  validateName,
} from "@/helpers/validators";
import { Fonts } from "@/constants/fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import BirthdayPicker from "./BirthdayPicker";
import FormButton from "./FormButton";
import { fontSize, verticalScale } from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import FormCheckbox from "./FormCheckbox";
import FormPickerTextInput from "./FormPickerTextInput";

interface FormInputConfig {
  name: string;
  initialValue?: string;
  title?: string;
  submit?: () => void;
  placeholder?: string;
  validator?: (value: string) => { isValid: boolean; errorMessage: string };
  iconName?: keyof typeof Ionicons.glyphMap | undefined;
  type:
    | "text-input"
    | "birthday-picker"
    | "submit-button"
    | "checkbox"
    | "form-picker-input-text";
  maxLength?: number;
  disabled?: boolean;
  matches?: string;
  inputMode?: InputModeOptions;
}

interface TextInputStyleType {
  backgroundColor?: string;
  borderColor: string;
  color: string;
}

interface UserInfoFormProps {
  ticketType?: "male" | "female" | null | undefined;
}

export default function UserInfoForm({ ticketType }: UserInfoFormProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const [birthday, setBirthday] = useState<string>("01/01/2000");
  const [countryCode, setCountryCode] = useState<string>("+55");
  const [isSubmitButtonDisabled, setIsSubmitButtondisabled] = useState(true);

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
      name: "name",
      placeholder: "Nome",
      validator: validateName,
      maxLength: NAME_MAX_LENGTH,
      iconName: "person",
      inputMode: "text",
    },
    {
      type: "text-input",
      name: "email",
      placeholder: "Email",
      validator: validateEmail,
      iconName: "mail",
      maxLength: EMAIL_MAX_LENGTH,
      inputMode: "email",
    },
    {
      type: "text-input",
      name: "confirm-email",
      placeholder: "Confirme seu Email",
      matches: "email",
      iconName: "mail",
      maxLength: EMAIL_MAX_LENGTH,
    },
    {
      type: "form-picker-input-text",
      name: "mobile-number",
      placeholder: "Telefone",
      validator: validateMobileNumber,
      maxLength: MOBILE_NUMBER_MAX_LENGTH,
      iconName: "call",
      inputMode: "text",
    },
    {
      type: "form-picker-input-text",
      name: "confirm-mobile-number",
      placeholder: "Confirme seu telefone",
      matches: "mobile-number",
      maxLength: MOBILE_NUMBER_MAX_LENGTH,
      iconName: "call",
    },
    {
      type: "text-input",
      name: "instagram",
      placeholder: "Instagram",
      validator: validateInstagram,
      maxLength: INSTAGRA_MAX_LENGTH,
      iconName: "logo-instagram",
    },
    {
      type: "birthday-picker",
      name: "birthday",
      placeholder: "Data de nascimento",
      validator: validateBirthday,
      iconName: "calendar",
    },
    {
      type: "checkbox",
      name: "cupom",
      placeholder: "Cupom",
      iconName: "wallet",
      maxLength: CUPOM_MAX_LENGTH,
    },
    {
      type: "submit-button",
      name: "buy",
      title: "Comprar",
      disabled: isSubmitButtonDisabled,
      submit: async () => {
        router.push(
          `/confirm?email=${formState["email"].value}&name=${formState["name"].value}&ticketType=${ticketType}&birthday=${birthday}`
        );
      },
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

  useEffect(() => {
    const allFieldsValid = formInputs
      .filter((input) => input.type === "text-input")
      .every(
        (input) =>
          formState[input.name].isValid && formState[input.name].value !== ""
      );

    const emailsMatch =
      formState["email"].value === formState["confirm-email"].value;
    const mobileNumbersMatch =
      formState["mobile-number"].value ===
      formState["confirm-mobile-number"].value;

    const allFieldsValidAndMatching =
      allFieldsValid &&
      emailsMatch &&
      mobileNumbersMatch &&
      validateBirthday(birthday).isValid;

    setIsSubmitButtondisabled(!allFieldsValidAndMatching);
  }, [formState]);

  const handleTextChange = (
    name: string,
    text: string,
    validator: FormInputConfig["validator"]
  ) => {
    const { isValid, errorMessage } = validator
      ? validator(text)
      : { isValid: true, errorMessage: "" };

    const matchName = formInputs.find((input) => input.name === name)?.matches;
    if (matchName) {
      const matchValue = formState[matchName].value;
      const isMatchValid = matchValue === text;

      setFormState((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          value: text,
          isValid: isMatchValid || text.length === 0,
          errorMessage:
            isMatchValid || text.length === 0 ? "" : "Valores não correspondem",
        },
      }));
      return;
    }

    const matchingInput = formInputs.find((input) => input.matches === name);
    if (matchingInput) {
      const matchingInputName = matchingInput.name;
      const isMatchValid = text === formState[matchingInputName].value;

      setFormState((prevState) => ({
        ...prevState,
        [matchingInputName]: {
          ...prevState[matchingInputName],
          isValid:
            isMatchValid || formState[matchingInputName].value.length === 0,
          errorMessage:
            isMatchValid || formState[matchingInputName].value.length === 0
              ? ""
              : "Valores não correspondem",
        },
      }));
    }

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
        value:
          prevState[name].value === ""
            ? formInputs.find((input) => input.name === name)?.initialValue ||
              ""
            : prevState[name].value,
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
      disabled,
      inputMode,
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
          backgroundColor={disabled ? colors.surfaceDisabled : colors.primary}
          textColor={disabled ? colors.onSurfaceDisabled : colors.onPrimary}
          disabled={disabled}
        />
      );
    } else if (type === "checkbox") {
      return (
        <FormCheckbox
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
    } else if (type === "form-picker-input-text") {
      return (
        <FormPickerTextInput
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
          testId={`${name}-picker-input`}
          inputMode={inputMode}
        />
      );
    }
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
        inputMode={inputMode}
      />
    );
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
