import DefaultContainer from "@/components/containers/DefaultContainer";
import {
  Button,
  Icon,
  Surface,
  Text,
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
import { useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Fonts } from "@/constants/fonts";
import NewTicketTypeSelector, {
  TicketSelectorStyle,
} from "@/components/form/NewTicketTypeSelector";

export default function NewEventPage() {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);

  const ticketSelectorSelectedStyle: TicketSelectorStyle = {
    selector: {
      backgroundColor: colors.primaryContainer,
    },
    badge: {
      backgroundColor: colors.primary,
      color: colors.onPrimary,
    },
  };
  const [ticketSelectorStyle, setTicketSelectorStyle] =
    useState<TicketSelectorStyle>({ selector: {}, badge: {} });
  function handleTicketSelection() {
    setIsSelected((prevSelected) => {
      const newState = !prevSelected;
      setTicketSelectorStyle(
        newState ? ticketSelectorSelectedStyle : { selector: {}, badge: {} }
      );
      return newState;
    });
  }
  return (
    <DefaultContainer>
      <TicketFormContainer>
        <View style={{ rowGap: verticalScale(5) }}>
          <NewTicketTypeSelector
            isSelected={isSelected}
            onPress={() => handleTicketSelection()}
            style={ticketSelectorStyle}
            title="MASCULINO"
            price="R$ 20,00"
            hasBadge={true}
            badgeText="Requer aprovação"
          />
        </View>
      </TicketFormContainer>
    </DefaultContainer>
  );
}
