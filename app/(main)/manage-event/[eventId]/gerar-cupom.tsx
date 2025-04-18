import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  verticalScale,
  moderateScale,
} from "@/helpers/responsiveScaling";
import * as Yup from "yup";
import { Formik } from "formik";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  useTheme,
  Text,
  HelperText,
  Divider,
  Button,
  RadioButton,
  Portal,
  Dialog,
  IconButton,
  Snackbar,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import ErrorDialog from "@/components/error/ErrorDialog";
import * as Clipboard from "expo-clipboard";

const CouponFormSchema = Yup.object().shape({
  couponType: Yup.string().required("Este campo é obrigatório"),
  percentageCouponValue: Yup.number().when("couponType", {
    is: "percentage",
    then: () =>
      Yup.number()
        .required("Este campo é obrigatório")
        .min(0, "O valor mínimo é 0%")
        .max(100, "O valor máximo é 100%"),
    otherwise: () => Yup.number().notRequired(),
  }),
  fixedCouponValue: Yup.string().when("couponType", {
    is: "fixed",
    then: () =>
      Yup.string()
        .required("Este campo é obrigatório")
        .matches(/^\d+(,\d{2})?$/, "Formato inválido"),
  }),
  couponCode: Yup.string()
    .min(5, "Deve possuir no mínimo 5 caracteres")
    .max(10, "Deve possuir no máximo 10 caracteres")
    .required("Este campo é obrigatório"),
});

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: verticalScale(10),
  },
  sliderLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(5),
  },
});

export default function GenerateCoupon() {
  const { colors } = useTheme();
  const { couponGateway } = useGateway();
  const { session } = useSession();
  const { eventId } = useLocalSearchParams() as { eventId: string };
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccessDialogVisible, setIsSuccessDialogVisible] = useState(false);
  const [isCopySnackbarVisible, setIsCopySnackbarVisible] = useState(false);

  return (
    <DefaultContainer>
      <View style={{ width: "100%" }}>
        {error && (
          <ErrorDialog
            message={errorMessage}
            onDismiss={function (): void {
              setError(false);
            }}
          />
        )}

        <Formik
          initialValues={{
            couponType: "percentage",
            percentageCouponValue: 0,
            fixedCouponValue: "",
            maxUses: 1,
            couponCode: "",
          }}
          onSubmit={async (values) => {
            try {
              await couponGateway.generateCoupon(
                {
                  eventId: Number(eventId),
                  code: values.couponCode,
                  discountType: values.couponType,
                  discountValue:
                    values.couponType === "percentage"
                      ? values.percentageCouponValue
                      : Number(values.fixedCouponValue),
                  maxUses: values.maxUses,
                },
                session || ""
              );
              setIsSuccessDialogVisible(true);
            } catch (error: any) {
              setError(true);
              setErrorMessage(error.message);
            }
          }}
          validationSchema={CouponFormSchema}
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
            isValid,
          }) => (
            <View style={{ rowGap: verticalScale(10), width: "100%" }}>
              {isSuccessDialogVisible && (
                <Portal>
                  <Dialog
                    visible={true}
                    onDismiss={() => {
                      setIsSuccessDialogVisible(false);
                    }}
                  >
                    <Dialog.Title>Cupom gerado com sucesso!</Dialog.Title>
                    <Dialog.Content style={{ alignItems: "center" }}>
                      <View
                        style={{
                          width: "70%",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          backgroundColor: colors.elevation.level1,
                          borderRadius: moderateScale(15),
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: Fonts.regular,
                            fontSize: fontSize(22),
                            paddingVertical: verticalScale(3),
                            paddingHorizontal: moderateScale(10),
                            borderBottomWidth: 2,
                            borderColor: colors.onBackground,
                            borderStyle: "dotted",
                          }}
                        >
                          {values.couponCode}
                        </Text>
                        <IconButton
                          icon={"content-copy"}
                          onPress={() => {
                            Clipboard.setStringAsync(values.couponCode);
                          }}
                        />
                      </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button
                        onPress={() => {
                          setIsSuccessDialogVisible(false);
                        }}
                      >
                        Fechar
                      </Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              )}
              <Portal>
                <Snackbar
                  visible={isCopySnackbarVisible}
                  onDismiss={() => {
                    setIsCopySnackbarVisible(false);
                  }}
                  action={{
                    label: "Fechar",
                    onPress: () => {
                      setIsCopySnackbarVisible(false);
                    },
                  }}
                >
                  Cupom copiado com sucesso!
                </Snackbar>
              </Portal>
              <Text style={{ fontSize: fontSize(20) }}>Tipo do cupom</Text>
              <RadioButton.Group
                onValueChange={(value) => {
                  setFieldValue("couponType", value);
                  if (value === "percentage") {
                    setFieldValue("fixedCouponValue", "");
                    setFieldValue("percentageCouponValue", 0); // Always a number
                  } else {
                    setFieldValue("percentageCouponValue", 0); // Reset to 0, not null
                    setFieldValue("fixedCouponValue", "");
                  }
                }}
                value={values.couponType}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="percentage" />
                  <Text style={{ fontSize: fontSize(16) }}>Percentual</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <RadioButton value="fixed" />
                  <Text style={{ fontSize: fontSize(16) }}>Valor fixo</Text>
                </View>
              </RadioButton.Group>
              {errors.couponType && touched.couponType && (
                <HelperText
                  type="error"
                  style={{
                    color: colors.error,
                    padding: moderateScale(4),
                  }}
                >
                  {errors.couponType}
                </HelperText>
              )}
              <Divider />
              {values.couponType === "percentage" ? (
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabel}>
                    <Text
                      style={{
                        fontFamily: Fonts.semiBold,
                        fontSize: fontSize(15),
                        color: colors.onSurfaceVariant,
                      }}
                    >
                      Valor do cupom
                    </Text>
                    <Text
                      style={{
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(15),
                        color: colors.onSurface,
                      }}
                    >
                      {values.percentageCouponValue.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Text>
                  </View>
                  <Slider
                    style={{ width: "100%", height: verticalScale(30) }}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
                    value={values.percentageCouponValue}
                    onValueChange={(value) =>
                      setFieldValue("percentageCouponValue", value)
                    }
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.outline}
                    thumbTintColor={colors.primary}
                  />
                  {errors.percentageCouponValue &&
                    touched.percentageCouponValue && (
                      <HelperText
                        type="error"
                        style={{
                          color: colors.error,
                          padding: moderateScale(4),
                        }}
                      >
                        {errors.percentageCouponValue}
                      </HelperText>
                    )}
                </View>
              ) : (
                <View>
                  <TextInput
                    onChangeText={handleChange("fixedCouponValue")}
                    onBlur={handleBlur("fixedCouponValue")}
                    value={values.fixedCouponValue}
                    mode="outlined"
                    label={
                      <Text
                        style={{
                          color: colors.onSurfaceVariant,
                          fontFamily: Fonts.regular,
                          fontSize: fontSize(15),
                        }}
                      >
                        Valor do cupom
                      </Text>
                    }
                    placeholder="Digite o valor do cupom"
                    style={{
                      backgroundColor: colors.elevation.level0,
                      fontFamily: Fonts.regular,
                    }}
                    contentStyle={{ fontFamily: Fonts.regular }}
                    left={<TextInput.Icon icon="currency-brl" />}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType="numeric"
                  />
                  {errors.fixedCouponValue && touched.fixedCouponValue && (
                    <HelperText
                      type="error"
                      style={{
                        color: colors.error,
                        padding: moderateScale(4),
                      }}
                    >
                      {errors.fixedCouponValue}
                    </HelperText>
                  )}
                </View>
              )}
              <View style={styles.sliderContainer}>
                <View style={styles.sliderLabel}>
                  <Text
                    style={{
                      fontFamily: Fonts.semiBold,
                      fontSize: fontSize(15),
                      color: colors.onSurfaceVariant,
                    }}
                  >
                    Máximo de utilizações
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.regular,
                      fontSize: fontSize(15),
                      color: colors.onSurface,
                    }}
                  >
                    {values.maxUses}
                  </Text>
                </View>
                <Slider
                  style={{ width: "100%", height: verticalScale(30) }}
                  minimumValue={1}
                  maximumValue={10}
                  step={1}
                  value={values.maxUses}
                  onValueChange={(value) => setFieldValue("maxUses", value)}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.outline}
                  thumbTintColor={colors.primary}
                />
                {errors.maxUses && touched.maxUses && (
                  <HelperText
                    type="error"
                    style={{
                      color: colors.error,
                      padding: moderateScale(4),
                    }}
                  >
                    {errors.maxUses}
                  </HelperText>
                )}
              </View>
              <View style={{ rowGap: verticalScale(5), width: "100%" }}>
                <TextInput
                  onChangeText={(text) => {
                    const cleanedText = text
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "");
                    setFieldValue("couponCode", cleanedText);
                  }}
                  onBlur={handleBlur("couponCode")}
                  value={values.couponCode}
                  mode="outlined"
                  label={
                    <Text
                      style={{
                        color: colors.onSurfaceVariant,
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(15),
                      }}
                    >
                      Código do cupom
                    </Text>
                  }
                  placeholder="Digite o código do cupom"
                  style={{
                    backgroundColor: colors.elevation.level0,
                    fontFamily: Fonts.regular,
                  }}
                  contentStyle={{ fontFamily: Fonts.regular }}
                  left={<TextInput.Icon icon="card-text" />}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  autoFocus={false}
                />
                {errors.couponCode && touched.couponCode && (
                  <HelperText
                    type="error"
                    style={{
                      color: colors.error,
                      padding: moderateScale(4),
                    }}
                  >
                    {errors.couponCode}
                  </HelperText>
                )}

                <Divider style={{ marginVertical: verticalScale(10) }} />
                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  disabled={!isValid || isSubmitting}
                >
                  Gerar cupom
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </DefaultContainer>
  );
}
