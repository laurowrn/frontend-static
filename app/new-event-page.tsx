import DefaultContainer from "@/components/containers/DefaultContainer";
import {
  Button,
  Checkbox,
  HelperText,
  Surface,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import TicketFormContainer from "@/components/containers/TicketFormContainer";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import React, { useState } from "react";
import { FlatList, StyleProp, View, ViewStyle } from "react-native";
import NewTicketTypeSelector, {
  TicketSelectorStyle,
} from "@/components/form/NewTicketTypeSelector";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { Fonts } from "@/constants/fonts";
import * as Yup from "yup";
import { validateMobileNumber } from "@/helpers/validators";
import MaskInput from "react-native-mask-input";

interface TicketType {
  id: number;
  title: string;
  price: string;
  hasBadge?: boolean;
  badgeText?: string;
}

const ticketTypes: TicketType[] = [
  {
    id: 1,
    title: "MASCULINO",
    price: "R$ 20,00",
    hasBadge: true,
    badgeText: "Requer aprovação",
  },
  {
    id: 2,
    title: "FEMININO",
    price: "R$ 15,00",
    hasBadge: false,
  },
  {
    id: 3,
    title: "VIP",
    price: "R$ 50,00",
    hasBadge: true,
    badgeText: "Acesso especial",
  },
  {
    id: 4,
    title: "VIP",
    price: "R$ 50,00",
    hasBadge: true,
    badgeText: "Acesso especial",
  },
];

const phoneMask = [
  "+",
  /\d/,
  /\d/,
  " ",
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

const TicketFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(/@/, "Por favor, insira um email válido")
    .required("Este campo é obrigatório"),
  name: Yup.string()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Por favor, insira um nome válido")
    .required("Este campo é obrigatório"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email")], "Os emails devem ser iguais")
    .matches(/@/, "Por favor, insira um email válido")
    .required("Este campo é obrigatório"),
  mobileNumber: Yup.string()
    .test("mobile-number-validation", (value, context) => {
      const cleanValue = value?.replace(/[()\s-]/g, "") || "";
      const result = validateMobileNumber(cleanValue);
      return result.isValid
        ? true
        : context.createError({ message: result.errorMessage });
    })
    .required("Este campo é obrigatório"),
});

export default function NewEventPage() {
  const { colors } = useTheme();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isTicketTypeSelected, setIsTicketTypeSelected] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);

  const ticketSelectorSelectedStyle: TicketSelectorStyle = {
    selector: {
      backgroundColor: colors.primaryContainer,
    },
    badge: {
      backgroundColor: colors.primary,
      color: colors.onPrimary,
    },
  };

  const ticketSelectorDefaultStyle: TicketSelectorStyle = {
    selector: {},
    badge: {},
  };

  const handleTicketSelection = (ticketId: number) => {
    setSelectedTicketId(ticketId);
  };

  const renderTicketItem = ({ item }: { item: TicketType }) => {
    const isSelected = selectedTicketId === item.id;
    return (
      <NewTicketTypeSelector
        isSelected={isSelected}
        onPress={() => {
          handleTicketSelection(item.id);
          setIsTicketTypeSelected(true);
        }}
        style={
          isSelected ? ticketSelectorSelectedStyle : ticketSelectorDefaultStyle
        }
        title={item.title}
        price={item.price}
        hasBadge={item.hasBadge}
        badgeText={item.badgeText || ""}
      />
    );
  };

  return (
    <DefaultContainer>
      <TicketFormContainer>
        <Formik
          initialValues={{
            selectedTicket: "",
            name: "",
            email: "",
            confirmEmail: "",
            mobileNumber: "+55",
            birthday: "",
          }}
          onSubmit={(values) => console.log(values)}
          validationSchema={TicketFormSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            validateForm,
            isSubmitting,
            setSubmitting,
            isValid,
            isValidating,
          }) => (
            <View style={{ rowGap: verticalScale(10) }}>
              <FlatList
                data={ticketTypes}
                renderItem={renderTicketItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ gap: verticalScale(8) }}
                extraData={selectedTicketId}
                style={{ paddingTop: verticalScale(10) }}
                onTouchEnd={() => {
                  if (selectedTicketId) {
                    setFieldValue(
                      "selectedTicket",
                      selectedTicketId.toString()
                    );
                  }
                }}
              />

              {isTicketTypeSelected && !isFormShown && (
                <Button
                  mode="contained"
                  onPress={() => {
                    setIsFormShown(true);
                  }}
                >
                  Solicitar participação
                </Button>
              )}
              {isFormShown && (
                <View style={{ rowGap: verticalScale(5) }}>
                  <View>
                    <TextInput
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                          }}
                          variant="bodyLarge"
                        >
                          Nome
                        </Text>
                      }
                      placeholder="Digite seu nome"
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{ fontFamily: Fonts.regular }}
                      left={<TextInput.Icon icon="account" />}
                      autoCapitalize="words"
                      autoComplete="name"
                      autoCorrect={false}
                      autoFocus={true}
                    />
                    {errors.name && touched.name && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.name}
                      </HelperText>
                    )}
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                          }}
                          variant="bodyLarge"
                        >
                          E-mail
                        </Text>
                      }
                      placeholder="Digite seu email"
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{ fontFamily: Fonts.regular }}
                      left={<TextInput.Icon icon="email" />}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                      autoFocus={false}
                    />
                    {errors.email && touched.email && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.email}
                      </HelperText>
                    )}
                  </View>
                  <View>
                    <TextInput
                      onChangeText={handleChange("confirmEmail")}
                      onBlur={handleBlur("confirmEmail")}
                      value={values.confirmEmail}
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                          }}
                          variant="bodyLarge"
                        >
                          Confirme seu e-mail
                        </Text>
                      }
                      placeholder="Digite seu email"
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{ fontFamily: Fonts.regular }}
                      left={<TextInput.Icon icon="email" />}
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect={false}
                      autoFocus={false}
                    />
                    {errors.confirmEmail && touched.confirmEmail && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.confirmEmail}
                      </HelperText>
                    )}
                  </View>
                  <View>
                    <TextInput
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                          }}
                          variant="bodyLarge"
                        >
                          Telefone
                        </Text>
                      }
                      placeholder={
                        !touched.mobileNumber && values.mobileNumber === "+55"
                          ? "Digite seu telefone"
                          : undefined
                      }
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{
                        fontFamily: Fonts.regular,
                      }}
                      left={<TextInput.Icon icon="phone" />}
                      autoCapitalize="none"
                      autoComplete="tel"
                      autoCorrect={false}
                      autoFocus={false}
                      value={values.mobileNumber} // Controls label animation
                      onChangeText={handleChange("mobileNumber")}
                      onBlur={handleBlur("mobileNumber")}
                      render={(props) => (
                        <MaskInput
                          {...props}
                          value={values.mobileNumber}
                          onChangeText={(masked) => {
                            setFieldValue("mobileNumber", masked);
                          }}
                          mask={phoneMask}
                          keyboardType="phone-pad"
                        />
                      )}
                    />
                    {errors.mobileNumber && touched.mobileNumber && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.mobileNumber}
                      </HelperText>
                    )}
                  </View>
                  <View>
                    <TextInput
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                          }}
                          variant="bodyLarge"
                        >
                          Data de nascimento
                        </Text>
                      }
                      placeholder={"Exemplo: 01/01/2000"}
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{
                        fontFamily: Fonts.regular,
                      }}
                      left={<TextInput.Icon icon="calendar" />}
                      autoCapitalize="none"
                      autoComplete="birthdate-full"
                      autoCorrect={false}
                      autoFocus={false}
                      value={values.birthday}
                      onChangeText={handleChange("birthday")}
                      onBlur={handleBlur("birthday")}
                      render={(props) => (
                        <MaskInput
                          {...props}
                          value={values.birthday}
                          onChangeText={(masked) => {
                            setFieldValue("birthday", masked);
                          }}
                          mask={dateMask}
                          keyboardType="phone-pad"
                        />
                      )}
                    />
                    {errors.birthday && touched.birthday && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.birthday}
                      </HelperText>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                      }}
                      onPress={() => setHasCoupon(!hasCoupon)}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Checkbox
                          status={hasCoupon ? "checked" : "unchecked"}
                        />
                        <Text
                          style={{
                            fontFamily: Fonts.semiBold,
                          }}
                          variant="bodyLarge"
                        >
                          Possuo cupom
                        </Text>
                      </View>
                    </Button>
                  </View>
                  <Button
                    mode="contained"
                    onPress={() => {
                      setIsFormShown(true);
                    }}
                  >
                    Comprar
                  </Button>
                </View>
              )}
            </View>
          )}
        </Formik>
      </TicketFormContainer>
    </DefaultContainer>
  );
}
