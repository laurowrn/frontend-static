import DefaultContainer from "@/components/containers/DefaultContainer";
import FormButton from "@/components/form/FormButton";
import { Fonts } from "@/constants/fonts";
import { useTheme } from "@/context/ThemeContext";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
export default function PrivacyPolicyPage() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <DefaultContainer>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: horizontalScale(1500),
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          Política de Privacidade
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          A sua privacidade é importante para nós. É política do Tikko respeitar
          a sua privacidade em relação a qualquer informação sua que possamos
          coletar no site Tikko, e outros sites que possuímos e operamos.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Solicitamos informações pessoais apenas quando realmente precisamos
          delas para lhe fornecer um serviço. Fazemo-lo por meios justos e
          legais, com o seu conhecimento e consentimento. Também informamos por
          que estamos coletando e como será usado.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Apenas retemos as informações coletadas pelo tempo necessário para
          fornecer o serviço solicitado. Quando armazenamos dados, protegemos
          dentro de meios comercialmente aceitáveis ​​para evitar perdas e
          roubos, bem como acesso, divulgação, cópia, uso ou modificação não
          autorizados.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Não compartilhamos informações de identificação pessoal publicamente
          ou com terceiros, exceto quando exigido por lei.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          O nosso site pode ter links para sites externos que não são operados
          por nós. Esteja ciente de que não temos controle sobre o conteúdo e
          práticas desses sites e não podemos aceitar responsabilidade por suas
          respectivas políticas de privacidade.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Você é livre para recusar a nossa solicitação de informações pessoais,
          entendendo que talvez não possamos fornecer alguns dos serviços
          desejados.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          O uso continuado de nosso site será considerado como aceitação de
          nossas práticas em torno de privacidade e informações pessoais. Se
          você tiver alguma dúvida sobre como lidamos com dados do usuário e
          informações pessoais, entre em contacto connosco.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.bold,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Compromisso do Usuário
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          O usuário se compromete a fazer uso adequado dos conteúdos e da
          informação que o Tikko oferece no site e com caráter enunciativo, mas
          não limitativo:
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          A) Não se envolver em atividades que sejam ilegais ou contrárias à boa
          fé a à ordem pública;
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(5),
          }}
        >
          B) Não difundir propaganda ou conteúdo de natureza racista,
          xenofóbica, bbebbet ou azar, qualquer tipo de pornografia ilegal, de
          apologia ao terrorismo ou contra os direitos humanos;
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(5),
          }}
        >
          C) Não causar danos aos sistemas físicos (hardwares) e lógicos
          (softwares) do Tikko, de seus fornecedores ou terceiros, para
          introduzir ou disseminar vírus informáticos ou quaisquer outros
          sistemas de hardware ou software que sejam capazes de causar danos
          anteriormente mencionados.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.bold,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Mais informações
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
          }}
        >
          Esperemos que esteja esclarecido e, como mencionado anteriormente, se
          houver algo que você não tem certeza se precisa ou não, geralmente é
          mais seguro deixar os cookies ativados, caso interaja com um dos
          recursos que você usa em nosso site.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.regular,
            textAlign: "justify",
            paddingTop: verticalScale(10),
            paddingBottom: verticalScale(10),
          }}
        >
          Esta política é efetiva a partir de 12 de Fevereiro 2025 22:16
        </Text>
        <FormButton
          title="Voltar"
          backgroundColor={colors.primary}
          textColor={colors.onPrimary}
          onPress={() => {
            router.back();
          }}
        />
        <View style={{ paddingBottom: verticalScale(30) }} />
      </ScrollView>
    </DefaultContainer>
  );
}
