import { StyleSheet, TouchableOpacity } from "react-native";
import { Calendar, I18nConfig, NativeDateService, StyleType, Text } from "@ui-kitten/components";
import { CalendarDateInfo } from "@ui-kitten/components/ui/calendar/type";
import Animated, { FadeInUp } from 'react-native-reanimated';
import { CakeType } from "../types";

const i18n: I18nConfig = {
  dayNames: {
    short: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    long: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  },
  monthNames: {
    short: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  },
};
export const localeDateService = new NativeDateService('pt-br', { i18n, startDayOfWeek: 0 });

interface Props {
  date: Date;
  setDate: (date: Date) => void;
  fetchCakes: (date: Date) => void;
  cakes: CakeType[] | undefined;
}

export default function Calendar_(props: Props) {

  const renderDay = (
    info: CalendarDateInfo<Date>,
    style: StyleType
  ): React.ReactElement => {

    const count = props.cakes ?
      props.cakes.filter((cake) =>
        new Date(cake.deliveryDate).toISOString().split('T')[0] === info.date.toISOString().split('T')[0]
      ).length :
      0

    return (
      <TouchableOpacity
        style={[style.container, styles.day]}
        onPress={() => props.setDate(info.date)}
      >
        <Text style={style.text}>{info.date.getDate()}</Text>
        {count > 0 &&
          <Text style={styles.count} status='control'>{count}</Text>
        }
      </TouchableOpacity>
    )
  }

  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <Calendar
        dateService={localeDateService}
        date={props.date}
        style={styles.calendar}
        onVisibleDateChange={props.fetchCakes}
        renderDay={renderDay}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  day: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  count: {
    fontSize: 10,
    textAlign: "center",
    position: "absolute",
    top: '50%',
    right: 0,
    padding: 5,
    width: 22,
    height: 22,
    backgroundColor: 'rgba(181,17,47,.7)',
    borderRadius: 50
  }
});