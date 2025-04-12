import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  verticalScale,
  moderateScale,
} from "@/helpers/responsiveScaling";
import * as Yup from "yup";
import { Formik } from "formik";
import { View } from "react-native";
import {
  TextInput,
  useTheme,
  Text,
  HelperText,
  Divider,
  Button,
  RadioButton,
} from "react-native-paper";
import MaskInput from "react-native-mask-input";

const CouponFormSchema = Yup.object().shape({
  coupomType: Yup.string().required("Este campo é obrigatório"),
  cupomValue: Yup.string().required("Este campo é obrigatório"),
  cupomCode: Yup.string().required("Este campo é obrigatório"),
});

const percentageCouponValueMask = [/\d/, /\d/, ",", /\d/, /\d/, "%"];

export default function Approvals() {
  const { colors } = useTheme();
  return (
    <DefaultContainer>
      <Formik
        initialValues={{
          couponType: "percentual",
          couponValue: "00,00%",
          couponCode: "",
        }}
        onSubmit={(values) => {}}
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
          setSubmitting,
          isValid,
        }) => (
          <View style={{ rowGap: verticalScale(10), width: "100%" }}>
            {/* <Portal>
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
                      hideConfirmationDialog();
                      setIsCheckoutVisible(true);
                    }}
                    disabled={!isConfirmationChecked || isSubmitting}
                    loading={isSubmitting}
                  >
                    Continuar
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal> */}

            <Text style={{ fontSize: fontSize(20) }}>Tipo do cupom</Text>
            <RadioButton.Group
              onValueChange={(value) => setFieldValue("couponType", value)}
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
              <View>
                <TextInput
                  mode="outlined"
                  label={
                    <Text
                      style={{
                        color: colors.onSurfaceVariant,
                        fontFamily: Fonts.regular,
                        fontSize: fontSize(15),
                      }}
                    >
                      Valor do coupom
                    </Text>
                  }
                  placeholder="Digite o valor do cupom"
                  style={{
                    backgroundColor: colors.elevation.level0,
                    fontFamily: Fonts.regular,
                  }}
                  contentStyle={{
                    fontFamily: Fonts.regular,
                  }}
                  left={<TextInput.Icon icon="percent" />}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  autoFocus={false}
                  value={values.couponValue}
                  onChangeText={handleChange("couponValue")}
                  onBlur={handleBlur("couponValue")}
                  render={(props) => (
                    <MaskInput
                      {...props}
                      value={values.couponValue}
                      onChangeText={(masked) => {
                        setFieldValue("couponValue", masked);
                      }}
                      mask={percentageCouponValueMask}
                      keyboardType="numeric"
                    />
                  )}
                />
                {errors.couponValue && touched.couponValue && (
                  <HelperText
                    type="error"
                    style={{
                      color: colors.error,
                      padding: moderateScale(4),
                    }}
                  >
                    {errors.couponValue}
                  </HelperText>
                )}
              </View>
            ) : (
              <View>
                <TextInput
                  onChangeText={handleChange("couponValue")}
                  onBlur={handleBlur("couponValue")}
                  value={values.couponValue}
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
                  left={<TextInput.Icon icon="numeric" />}
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect={false}
                  autoFocus={true}
                />
                {errors.couponValue && touched.couponValue && (
                  <HelperText
                    type="error"
                    style={{
                      color: colors.error,
                      padding: moderateScale(4),
                    }}
                  >
                    {errors.couponValue}
                  </HelperText>
                )}
              </View>
            )}
            <View style={{ rowGap: verticalScale(5), width: "100%" }}>
              <TextInput
                onChangeText={handleChange("couponCode")}
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
                autoCapitalize="characters"
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
                onPress={() => {}}
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
