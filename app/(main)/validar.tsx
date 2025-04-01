import DefaultContainer from "@/components/containers/DefaultContainer";
import FormButton from "@/components/form/FormButton";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "react-native-paper";
import {
  fontSize,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useGateway } from "@/context/GatewayContext";
import { useSession } from "@/context/AuthContext";
import { Divider, Snackbar } from "react-native-paper";
import { useStorageState } from "@/hooks/useStorageState";

export default function Validar() {
  const { ticketGateway } = useGateway();
  const { session } = useSession();
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [scannedData, setScannedData] = useState({
    ticketId: "",
    eventId: "",
    userId: "",
    ticketPricingId: "",
    alreadyValidated: false,
    ticketType: "",
    name: "",
  });
  const { colors } = useTheme();
  const [isValidationLoading, setIsValidationLoading] = useState(false);
  const [isConfirmationPopupVisible, setIsConfirmationPopupVisible] =
    useState(false);
  const router = useRouter();
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const onDismissSnackBar = () => setIsSuccessVisible(false);
  const [[isLoadingLastTicketId, lastTicketId], setlastTicketId] =
    useStorageState("lastTicketId");
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <DefaultContainer>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            rowGap: verticalScale(30),
          }}
        >
          <Text
            style={{
              color: colors.onBackground,
              fontFamily: Fonts.bold,
              fontSize: fontSize(20),
              textAlign: "center",
            }}
          >
            Nós precisamos da sua permissão para acessar a câmera
          </Text>
          <FormButton
            title="Pedir permissão"
            onPress={() => {
              requestPermission();
            }}
            backgroundColor={colors.primary}
            textColor={colors.onPrimary}
          />
        </View>
      </DefaultContainer>
    );
  }

  if (isConfirmationPopupVisible) {
    return (
      <Animated.View
        entering={FadeIn}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000d0",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setIsConfirmationPopupVisible(false)}
        />
        <Animated.View
          entering={FadeInDown}
          style={{
            width: "85%",
            maxWidth: horizontalScale(1000),
            paddingVertical: verticalScale(20),
            paddingHorizontal: horizontalScale(20),
            borderRadius: moderateScale(10),
            borderWidth: moderateScale(0.5),
            borderColor: colors.onBackground,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            rowGap: verticalScale(30),
          }}
        >
          <View
            style={{
              rowGap: verticalScale(20),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: fontSize(16),
                textAlign: "justify",
                color: colors.onBackground,
              }}
            >
              Confirme os dados do ingresso com os documentos do cliente:
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: fontSize(16),
                  textAlign: "justify",
                  color: colors.onBackground,
                }}
              >
                Nome: {scannedData.name}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: fontSize(16),
                  textAlign: "justify",
                  color: colors.onBackground,
                }}
              >
                Tipo do ingresso: {scannedData.ticketType}
              </Text>
            </View>

            <Animated.View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.error,
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(15),
                  borderWidth: moderateScale(0.5),
                  borderColor: colors.onError,
                  borderRadius: moderateScale(10),
                  flex: 2,
                }}
                onPress={() => setIsConfirmationPopupVisible(false)}
              >
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: fontSize(16),
                    color: colors.onError,
                    textAlign: "center",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: verticalScale(12),
                  paddingHorizontal: horizontalScale(15),
                  borderRadius: moderateScale(10),
                  flex: 2,
                }}
                onPress={async () => {
                  try {
                    setIsValidationLoading(true);
                    await ticketGateway.validate(
                      scannedData.ticketId,
                      session || ""
                    );
                    setIsValidationLoading(false);
                    setIsConfirmationPopupVisible(false);
                    setlastTicketId(scannedData.ticketId);
                    setIsCameraVisible(true);
                    setIsSuccessVisible(true);
                  } catch (error: any) {
                    setIsValidationLoading(false);
                    router.push(`/error?message=${error.message}`);
                  }
                }}
                disabled={isValidationLoading}
              >
                {isValidationLoading ? (
                  <ActivityIndicator size="small" color={colors.onPrimary} />
                ) : (
                  <Text
                    style={{
                      fontFamily: Fonts.bold,
                      fontSize: fontSize(16),
                      color: colors.onPrimary,
                      textAlign: "center",
                    }}
                  >
                    Validar
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraVisible ? (
        <View style={styles.container}>
          <CameraView
            style={styles.camera}
            facing={"back"}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={async (data) => {
              if (data.data === lastTicketId) {
                return;
              }
              setIsCameraVisible(false);
              let ticket;
              try {
                ticket = await ticketGateway.get(data.data, session || "");
                setScannedData(ticket);
                setIsConfirmationPopupVisible(true);
              } catch (error: any) {
                setScannedData({
                  ticketId: "",
                  eventId: "",
                  userId: "",
                  ticketPricingId: "",
                  alreadyValidated: false,
                  ticketType: "",
                  name: "",
                });
                router.push(`/error?message=${error.message}`);
              }
            }}
          >
            <Ionicons
              name="arrow-back"
              size={fontSize(30)}
              color={colors.onPrimary}
              style={{
                position: "absolute",
                backgroundColor: colors.primary,
                padding: moderateScale(8),
                borderRadius: moderateScale(10),
                top: verticalScale(40),
                left: horizontalScale(40),
              }}
              onPress={() => setIsCameraVisible(false)}
            />
            <View
              style={{
                width: moderateScale(300),
                height: moderateScale(300),
                borderColor: colors.primary,
                borderWidth: moderateScale(4),
                borderRadius: moderateScale(10),
                borderStyle: "dashed",
              }}
            />
            <Snackbar
              visible={isSuccessVisible}
              onDismiss={onDismissSnackBar}
              action={{
                label: "Fechar",
                onPress: () => {},
                labelStyle: { color: "white" },
              }}
              style={{ backgroundColor: "green" }}
            >
              Ingresso validado com sucesso!
            </Snackbar>
          </CameraView>
        </View>
      ) : (
        <DefaultContainer>
          <View style={{ rowGap: verticalScale(50) }}>
            <View style={{ rowGap: verticalScale(15) }}>
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(30),
                  color: colors.onBackground,
                  textAlign: "center",
                }}
              >
                Instruções
              </Text>
              <Divider style={{ backgroundColor: colors.onBackground }} />
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(20),
                  color: colors.onBackground,
                  textAlign: "justify",
                }}
              >
                1) Clique em "Validar ingresso" e permita que o aplicativo
                acesse a câmera do seu celular.
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(20),
                  color: colors.onBackground,
                  textAlign: "justify",
                }}
              >
                2) Com a câmera aberta, aponte para o QR Code do ingresso para
                escaneá-lo.
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  fontSize: fontSize(20),
                  color: colors.onBackground,
                  textAlign: "justify",
                }}
              >
                3) Após escanear, uma tela mostrará as informações do comprador.
                Confira os dados antes de confirmar a validação.
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: moderateScale(10),
                borderRadius: moderateScale(10),
              }}
              onPress={() => {
                setIsCameraVisible(true);
              }}
            >
              <Text
                style={{
                  color: colors.onPrimary,
                  fontFamily: Fonts.bold,
                  fontSize: fontSize(20),
                  textAlign: "center",
                }}
              >
                Validar ingresso
              </Text>
            </TouchableOpacity>
          </View>
        </DefaultContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "color",
    margin: 64,
    width: "100%",
    height: 1000,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
