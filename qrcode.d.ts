declare module "react-native-qrcode-styled" {
  import { ViewStyle } from "react-native";

  interface QRCodeStyledProps {
    data: string;

    style?: ViewStyle;

    padding?: number;

    pieceSize?: number;
  }

  const QRCodeStyled: React.FC<QRCodeStyledProps>;

  export default QRCodeStyled;
}
