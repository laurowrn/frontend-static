import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  HelperText,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import TicketFormContainer from "@/components/containers/TicketFormContainer";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import NewTicketTypeSelector, {
  TicketSelectorStyle,
} from "@/components/form/NewTicketTypeSelector";
import { Formik } from "formik";
import { Fonts } from "@/constants/fonts";
import * as Yup from "yup";
import {
  validateBirthday,
  validateCpf,
  validateMobileNumber,
} from "@/helpers/validators";
import MaskInput from "react-native-mask-input";
import ExpandedTicketTypeSelector from "@/components/form/ExpandedTicketTypeSelector";
import { TicketPricing } from "@/infrastructure/EventGateway";
import formatMoney from "@/helpers/formatMoney";
import * as WebBrowser from "expo-web-browser";
import { ExternalPathString, useRouter } from "expo-router";
import { useGateway } from "@/context/GatewayContext";

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
const identificationNumberMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

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
  confirmMobileNumber: Yup.string()
    .test("confirm-mobile-number-validation", (value, context) => {
      const cleanValue = value?.replace(/[()\s-]/g, "") || "";
      const result = validateMobileNumber(cleanValue);
      return result.isValid
        ? true
        : context.createError({ message: result.errorMessage });
    })
    .oneOf([Yup.ref("mobileNumber")], "Os números de telefone devem ser iguais")
    .required("Este campo é obrigatório"),
  instagramAccount: Yup.string().max(30).required("Este campo é obrigatório"),
  identificationNumber: Yup.string()
    .test("identification-number-validation", (value, context) => {
      const result = validateCpf(value?.replace(/[.-]/g, "") || "");
      return result.isValid
        ? true
        : context.createError({ message: result.errorMessage });
    })
    .required("Este campo é obrigatório"),
  birthday: Yup.string()
    .test("birthday-validation", (value, context) => {
      const result = validateBirthday(value || "");
      return result.isValid
        ? true
        : context.createError({ message: result.errorMessage });
    })
    .required("Este campo é obrigatório"),
});

interface TicketBuyingFormProps {
  ticketTypes: TicketPricing[];
}

export default function TicketBuyingForm({
  ticketTypes,
}: TicketBuyingFormProps) {
  const { colors } = useTheme();
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [isTicketTypeSelected, setIsTicketTypeSelected] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const [isConfirmationDialogVisible, setIsConfirmationDialogVisible] =
    useState(false);
  const showConfirmationDialog = () => setIsConfirmationDialogVisible(true);
  const hideConfirmationDialog = () => setIsConfirmationDialogVisible(false);
  const [isConfirmationChecked, setIsConfirmationChecked] = useState(false);
  const router = useRouter();
  const { eventGateway } = useGateway();

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

  const renderTicketItem = ({
    item,
    setFieldValue,
  }: {
    item: TicketPricing;
    setFieldValue: (field: string, value: any) => void;
  }) => {
    const isSelected = selectedTicketId === item.id;
    if (item.femaleCapacity! > 0 || item.maleCapacity! > 0) {
      return (
        <ExpandedTicketTypeSelector
          isSelected={isSelected}
          onPress={() => {
            setSelectedTicketId(item.id);
            setFieldValue("selectedTicket", item.id.toString());
            setIsTicketTypeSelected(true);
          }}
          style={
            isSelected
              ? ticketSelectorSelectedStyle
              : ticketSelectorDefaultStyle
          }
          title={item.ticketType}
          price={`R$ ${formatMoney(item.price)}`}
          hasBadge={item.requiresApproval}
          badgeText={"Requer aprovação"}
          sublist={[
            item.maleCapacity?.toString() || "",
            item.femaleCapacity?.toString() || "",
            item.price.toString() || "",
          ]}
        />
      );
    }
    return (
      <NewTicketTypeSelector
        isSelected={isSelected}
        onPress={() => {
          setSelectedTicketId(item.id);
          setFieldValue("selectedTicket", item.id.toString());
          setIsTicketTypeSelected(true);
        }}
        style={
          isSelected ? ticketSelectorSelectedStyle : ticketSelectorDefaultStyle
        }
        title={item.ticketType}
        price={`R$ ${formatMoney(item.price)}`}
        hasBadge={item.requiresApproval}
        badgeText={"Requer aprovação"}
      />
    );
  };

  return (
    <TicketFormContainer>
      <Formik
        initialValues={{
          selectedTicket: "",
          name: "",
          email: "",
          confirmEmail: "",
          mobileNumber: "+55",
          confirmMobileNumber: "+55",
          birthday: "",
          identificationNumber: "",
          instagramAccount: "",
          coupon: "",
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
          isSubmitting,
          setSubmitting,
          isValid,
        }) => (
          <View style={{ rowGap: verticalScale(10) }}>
            <Portal>
              <Dialog
                visible={isConfirmationDialogVisible}
                onDismiss={hideConfirmationDialog}
              >
                <Dialog.Title>Confirmação</Dialog.Title>
                <Dialog.Content>
                  <Text
                    style={{
                      textAlign: "justify",
                      fontFamily: Fonts.regular,
                      fontSize: fontSize(15),
                    }}
                  >
                    Ao completar a compra, você deverá esperar a confirmação do
                    organizador do evento. Após a confirmação, o seu ingresso
                    chegará por WhatsApp.
                  </Text>
                  <TouchableRipple
                    onPress={() => {
                      WebBrowser.openBrowserAsync(
                        "https://api.whatsapp.com/send?phone=5547997689918&text=Ol%C3%A1%2C%20eu%20gostaria%20de%20tirar%20uma%20d%C3%BAvida."
                      );
                    }}
                  >
                    <Text
                      style={{
                        color: colors.primary,
                        fontFamily: Fonts.semiBold,
                        fontSize: fontSize(15),
                      }}
                    >
                      Qualquer dúvida fale conosco.
                    </Text>
                  </TouchableRipple>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: horizontalScale(10),
                      paddingVertical: verticalScale(20),
                      width: "100%",
                    }}
                  >
                    <TouchableRipple
                      onPress={() =>
                        setIsConfirmationChecked(!isConfirmationChecked)
                      }
                    >
                      <Checkbox
                        status={isConfirmationChecked ? "checked" : "unchecked"}
                      />
                    </TouchableRipple>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          alignItems: "center",
                          rowGap: verticalScale(5),
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: Fonts.semiBold,
                            fontSize: fontSize(15),
                          }}
                        >
                          Concordo com a{" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: colors.primary,
                            fontFamily: Fonts.black,
                            fontSize: fontSize(15),
                          }}
                          onPress={() => router.push("/politica-privacidade")}
                        >
                          Política de Privacidade{" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            fontFamily: Fonts.semiBold,
                            fontSize: fontSize(15),
                          }}
                        >
                          e os{" "}
                        </Text>
                        <Text
                          style={{
                            textAlign: "left",
                            color: colors.primary,
                            fontFamily: Fonts.black,
                            fontSize: fontSize(15),
                          }}
                          onPress={() => router.push("/termos-e-condicoes")}
                        >
                          Termos e Condições.
                        </Text>
                      </View>
                    </View>
                  </View>
                </Dialog.Content>
                <Dialog.Actions style={{ columnGap: horizontalScale(20) }}>
                  <Button
                    mode="contained"
                    onPress={hideConfirmationDialog}
                    buttonColor={colors.error}
                    textColor={colors.onError}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    mode="contained"
                    onPress={async () => {
                      handleSubmit();
                      if (isSubmitting) return;

                      let registerAndJoinData;
                      try {
                        registerAndJoinData =
                          await eventGateway.registerAndJoin(
                            {
                              email: values.email,
                              username: values.name,
                              gender: values.selectedTicket,
                              birthday: new Date(
                                values.birthday.split("/").reverse().join("-")
                              ).toISOString(),
                              mobileNumber: values.mobileNumber.replace(
                                /[()\s-]/g,
                                ""
                              ),
                              instagram: values.instagramAccount,
                              identificationNumber:
                                values.identificationNumber.replace(
                                  /[.-]/g,
                                  ""
                                ),
                            },
                            1,
                            Number(values.selectedTicket),
                            values.coupon
                          );
                        if (registerAndJoinData.paymentURL) {
                          router.push(
                            registerAndJoinData.paymentURL as ExternalPathString
                          );
                        } else {
                          router.replace("/success");
                        }
                      } catch (error: any) {
                        router.push(`/error?message=${error.message}`);
                      }
                      hideConfirmationDialog();
                    }}
                    disabled={!isConfirmationChecked || isSubmitting}
                    loading={isSubmitting}
                  >
                    Continuar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
            <FlatList
              data={ticketTypes}
              renderItem={({ item }) =>
                renderTicketItem({ item, setFieldValue })
              }
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ gap: verticalScale(8) }}
              extraData={selectedTicketId}
              style={{ paddingTop: verticalScale(10) }}
            />

            {isTicketTypeSelected && !isFormShown && (
              <View>
                <Divider style={{ marginBottom: verticalScale(10) }} />
                <Button
                  mode="contained"
                  onPress={() => {
                    setIsFormShown(true);
                  }}
                >
                  Solicitar participação
                </Button>
              </View>
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
                          fontSize: fontSize(15),
                        }}
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
                          fontSize: fontSize(15),
                        }}
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
                          fontSize: fontSize(15),
                        }}
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
                          fontSize: fontSize(15),
                        }}
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
                    value={values.mobileNumber}
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
                          fontSize: fontSize(15),
                        }}
                      >
                        Confirme seu telefone
                      </Text>
                    }
                    placeholder={
                      !touched.confirmMobileNumber &&
                      values.confirmMobileNumber === "+55"
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
                    value={values.confirmMobileNumber}
                    onChangeText={handleChange("confirmMobileNumber")}
                    onBlur={handleBlur("confirmMobileNumber")}
                    render={(props) => (
                      <MaskInput
                        {...props}
                        value={values.confirmMobileNumber}
                        onChangeText={(masked) => {
                          setFieldValue("confirmMobileNumber", masked);
                        }}
                        mask={phoneMask}
                        keyboardType="phone-pad"
                      />
                    )}
                  />
                  {errors.confirmMobileNumber &&
                    touched.confirmMobileNumber && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.confirmMobileNumber}
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
                          fontSize: fontSize(15),
                        }}
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
                <View>
                  <TextInput
                    mode="outlined"
                    label={
                      <Text
                        style={{
                          backgroundColor: colors.elevation.level2,
                          color: colors.onSurfaceVariant,
                          fontSize: fontSize(15),
                        }}
                      >
                        CPF
                      </Text>
                    }
                    placeholder={"Exemplo: 111.111.111-11"}
                    style={{
                      backgroundColor: colors.elevation.level0,
                      fontFamily: Fonts.regular,
                    }}
                    contentStyle={{
                      fontFamily: Fonts.regular,
                    }}
                    left={<TextInput.Icon icon="account" />}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    autoFocus={false}
                    value={values.identificationNumber}
                    onChangeText={handleChange("identificationNumber")}
                    onBlur={handleBlur("identificationNumber")}
                    render={(props) => (
                      <MaskInput
                        {...props}
                        value={values.identificationNumber}
                        onChangeText={(masked) => {
                          setFieldValue("identificationNumber", masked);
                        }}
                        mask={identificationNumberMask}
                        keyboardType="phone-pad"
                      />
                    )}
                  />
                  {errors.identificationNumber &&
                    touched.identificationNumber && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.identificationNumber}
                      </HelperText>
                    )}
                </View>
                <View>
                  <TextInput
                    onChangeText={handleChange("instagramAccount")}
                    onBlur={handleBlur("instagramAccount")}
                    value={values.instagramAccount}
                    mode="outlined"
                    label={
                      <Text
                        style={{
                          backgroundColor: colors.elevation.level2,
                          color: colors.onSurfaceVariant,
                          fontFamily: Fonts.regular,
                          fontSize: fontSize(15),
                        }}
                      >
                        Instagram
                      </Text>
                    }
                    placeholder="Digite sua conta do instagram"
                    style={{
                      backgroundColor: colors.elevation.level0,
                      fontFamily: Fonts.regular,
                    }}
                    contentStyle={{ fontFamily: Fonts.regular }}
                    left={<TextInput.Icon icon="instagram" />}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    autoFocus={false}
                  />
                  {errors.instagramAccount && touched.instagramAccount && (
                    <HelperText
                      type="error"
                      style={{
                        color: colors.error,
                        padding: moderateScale(4),
                      }}
                    >
                      {errors.instagramAccount}
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
                      <Checkbox status={hasCoupon ? "checked" : "unchecked"} />
                      <Text
                        style={{
                          fontFamily: Fonts.semiBold,
                          fontSize: fontSize(15),
                        }}
                      >
                        Possuo cupom
                      </Text>
                    </View>
                  </Button>
                </View>
                {hasCoupon && (
                  <View style={{ paddingBottom: verticalScale(10) }}>
                    <TextInput
                      onChangeText={handleChange("coupon")}
                      onBlur={handleBlur("coupon")}
                      value={values.coupon}
                      mode="outlined"
                      label={
                        <Text
                          style={{
                            backgroundColor: colors.elevation.level2,
                            color: colors.onSurfaceVariant,
                            fontFamily: Fonts.regular,
                            fontSize: fontSize(15),
                          }}
                        >
                          Cupom
                        </Text>
                      }
                      placeholder="Digite seu cupom"
                      style={{
                        backgroundColor: colors.elevation.level0,
                        fontFamily: Fonts.regular,
                      }}
                      contentStyle={{ fontFamily: Fonts.regular }}
                      left={<TextInput.Icon icon="ticket-outline" />}
                      autoCapitalize="none"
                      autoComplete="off"
                      autoCorrect={false}
                      autoFocus={false}
                    />
                    {errors.coupon && touched.coupon && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.coupon}
                      </HelperText>
                    )}
                  </View>
                )}
                <Divider style={{ marginBottom: verticalScale(10) }} />
                <Button
                  mode="contained"
                  onPress={() => {
                    showConfirmationDialog();
                  }}
                  disabled={!isValid || isSubmitting}
                >
                  Comprar
                </Button>
              </View>
            )}
          </View>
        )}
      </Formik>
    </TicketFormContainer>
  );
}
