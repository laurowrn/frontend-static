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

export default function TermsAndconditionsPage() {
  const { colors } = useTheme();
  const router = useRouter();
  return (
    <DefaultContainer>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          // alignItems: "center",
          // justifyContent: "center",
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
          1. Termos
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
          Ao acessar ao site Tikko, concorda em cumprir estes termos de serviço,
          todas as leis e regulamentos aplicáveis ​​e concorda que é responsável
          pelo cumprimento de todas as leis locais aplicáveis. Se você não
          concordar com algum desses termos, está proibido de usar ou acessar
          este site. Os materiais contidos neste site são protegidos pelas leis
          de direitos autorais e marcas comerciais aplicáveis.
        </Text>
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          2. Uso de Licença
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
          É concedida permissão para baixar temporariamente uma cópia dos
          materiais (informações ou software) no site Tikko , apenas para
          visualização transitória pessoal e não comercial. Esta é a concessão
          de uma licença, não uma transferência de título e, sob esta licença,
          você não pode:
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
          1. modificar ou copiar os materiais;
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
          2. usar os materiais para qualquer finalidade comercial ou para
          exibição pública (comercial ou não comercial);
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
          3. tentar descompilar ou fazer engenharia reversa de qualquer software
          contido no site Tikko;
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
          4. remover quaisquer direitos autorais ou outras notações de
          propriedade dos materiais; ou
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
          5. transferir os materiais para outra pessoa ou 'espelhe' os materiais
          em qualquer outro servidor.
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
          Esta licença será automaticamente rescindida se você violar alguma
          dessas restrições e poderá ser rescindida por Tikko a qualquer
          momento. Ao encerrar a visualização desses materiais ou após o término
          desta licença, você deve apagar todos os materiais baixados em sua
          posse, seja em formato eletrónico ou impresso.
        </Text>
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          3. Isenção de responsabilidade
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
          1. Os materiais no site da Tikko são fornecidos 'como estão'. Tikko
          não oferece garantias, expressas ou implícitas, e, por este meio,
          isenta e nega todas as outras garantias, incluindo, sem limitação,
          garantias implícitas ou condições de comercialização, adequação a um
          fim específico ou não violação de propriedade intelectual ou outra
          violação de direitos.
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
          2. Além disso, o Tikko não garante ou faz qualquer representação
          relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do
          uso dos materiais em seu site ou de outra forma relacionado a esses
          materiais ou em sites vinculados a este site.
        </Text>
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          4. Limitações
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
          Em nenhum caso o Tikko ou seus fornecedores serão responsáveis ​​por
          quaisquer danos (incluindo, sem limitação, danos por perda de dados ou
          lucro ou devido a interrupção dos negócios) decorrentes do uso ou da
          incapacidade de usar os materiais em Tikko, mesmo que Tikko ou um
          representante autorizado da Tikko tenha sido notificado oralmente ou
          por escrito da possibilidade de tais danos. Como algumas jurisdições
          não permitem limitações em garantias implícitas, ou limitações de
          responsabilidade por danos conseqüentes ou incidentais, essas
          limitações podem não se aplicar a você.
        </Text>
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          5. Precisão dos materiais
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
          Os materiais exibidos no site da Tikko podem incluir erros técnicos,
          tipográficos ou fotográficos. Tikko não garante que qualquer material
          em seu site seja preciso, completo ou atual. Tikko pode fazer
          alterações nos materiais contidos em seu site a qualquer momento, sem
          aviso prévio. No entanto, Tikko não se compromete a atualizar os
          materiais.
        </Text>
        <Text
          style={{
            fontSize: fontSize(24),
            color: colors.onBackground,
            fontFamily: Fonts.black,
            paddingTop: verticalScale(30),
          }}
        >
          6. Links
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
          O Tikko não analisou todos os sites vinculados ao seu site e não é
          responsável pelo conteúdo de nenhum site vinculado. A inclusão de
          qualquer link não implica endosso por Tikko do site. O uso de qualquer
          site vinculado é por conta e risco do usuário.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.bold,
            textAlign: "justify",
            paddingTop: verticalScale(30),
          }}
        >
          Modificações
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
          O Tikko pode revisar estes termos de serviço do site a qualquer
          momento, sem aviso prévio. Ao usar este site, você concorda em ficar
          vinculado à versão atual desses termos de serviço.
        </Text>
        <Text
          style={{
            fontSize: fontSize(16),
            color: colors.onBackground,
            fontFamily: Fonts.bold,
            textAlign: "justify",
            paddingTop: verticalScale(30),
          }}
        >
          Lei aplicável
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
          Estes termos e condições são regidos e interpretados de acordo com as
          leis do Tikko e você se submete irrevogavelmente à jurisdição
          exclusiva dos tribunais naquele estado ou localidade.
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
