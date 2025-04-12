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
} from "react-native-paper";
import Slider from "@react-native-community/slider";

const CouponFormSchema = Yup.object().shape({
  couponType: Yup.string().required("Este campo é obrigatório"),
  percentualCouponValue: Yup.number().when("couponType", {
    is: "percentual",
    then: () =>
      Yup.number()
        .required("Este campo é obrigatório")
        .min(0, "O valor mínimo é 0%")
        .max(100, "O valor máximo é 100%"),
    otherwise: () => Yup.number().notRequired(),
  }),
  absoluteCouponValue: Yup.string().when("couponType", {
    is: "absolute",
    then: () =>
      Yup.string()
        .required("Este campo é obrigatório")
        .matches(/^\d+(,\d{2})?$/, "Formato inválido"),
  }),
  couponCode: Yup.string().required("Este campo é obrigatório"),
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

export default function Approvals() {
  const { colors } = useTheme();

  return (
    <DefaultContainer>
      <Formik
        initialValues={{
          couponType: "percentual",
          percentualCouponValue: 0,
          absoluteCouponValue: "",
          couponCode: "",
        }}
        onSubmit={(values) => {
          console.log(values);
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
            <Text style={{ fontSize: fontSize(20) }}>Tipo do cupom</Text>
            <RadioButton.Group
              onValueChange={(value) => {
                setFieldValue("couponType", value);
                if (value === "percentual") {
                  setFieldValue("absoluteCouponValue", "");
                  setFieldValue("percentualCouponValue", 0); // Always a number
                } else {
                  setFieldValue("percentualCouponValue", 0); // Reset to 0, not null
                  setFieldValue("absoluteCouponValue", "");
                }
              }}
              value={values.couponType}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="percentual" />
                <Text style={{ fontSize: fontSize(16) }}>Percentual</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="absolute" />
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
            {values.couponType === "percentual" ? (
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
                    {values.percentualCouponValue.toFixed(2)}%
                  </Text>
                </View>
                <Slider
                  style={{ width: "100%", height: verticalScale(30) }}
                  minimumValue={0}
                  maximumValue={100}
                  step={5}
                  value={values.percentualCouponValue}
                  onValueChange={(value) =>
                    setFieldValue("percentualCouponValue", value)
                  }
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor={colors.outline}
                  thumbTintColor={colors.primary}
                />
                {errors.percentualCouponValue &&
                  touched.percentualCouponValue && (
                    <HelperText
                      type="error"
                      style={{
                        color: colors.error,
                        padding: moderateScale(4),
                      }}
                    >
                      {errors.percentualCouponValue}
                    </HelperText>
                  )}
              </View>
            ) : (
              <View>
                <TextInput
                  onChangeText={handleChange("absoluteCouponValue")}
                  onBlur={handleBlur("absoluteCouponValue")}
                  value={values.absoluteCouponValue}
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
                {errors.absoluteCouponValue && touched.absoluteCouponValue && (
                  <HelperText
                    type="error"
                    style={{
                      color: colors.error,
                      padding: moderateScale(4),
                    }}
                  >
                    {errors.absoluteCouponValue}
                  </HelperText>
                )}
              </View>
            )}
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
    </DefaultContainer>
  );
}
