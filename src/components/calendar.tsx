import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Calendar, I18nConfig, NativeDateService, StyleType, Text, CircularProgressBar, ProgressBar } from "@ui-kitten/components";
import { CalendarDateInfo } from "@ui-kitten/components/ui/calendar/type";
import Cake from "../services/Cake";
import { useEffect, useState } from "react";
import { CakeType } from "../types";
import Animated, { FadeInUp } from 'react-native-reanimated';

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
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function Calendar_(props: Props) {
  const [listArr, setListArr] = useState<CakeType[]>([])
  // const [isLoading, setIsLoading] = useState(true);

  const renderDay = (
    info: CalendarDateInfo<Date>,
    style: StyleType
  ): React.ReactElement => {
    const count = listArr.filter((cake) =>
      new Date(cake.deliveryDate).getDate() == info.date.getDate() &&
      new Date(cake.deliveryDate).getMonth() == info.date.getMonth()
    ).length;

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

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await Cake.getByMonth(props.date.getMonth() + 1, props.date.getFullYear());
        setListArr(res)
        props.setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCakes();
  }, []);

  if (props.isLoading) {
    return (
      <Animated.View entering={FadeInUp.duration(400)} style={{ height: '50%' }} >
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgressBar
            progress={400}
            size="large"
            status="primary"
          />
          <Text status="primary" category="h6">Carregando...</Text>
        </View>
      </Animated.View>
    )
  }

  return (
    <Calendar
      dateService={localeDateService}
      date={props.date}
      onSelect={nextDate => props.setDate(nextDate)}
      style={styles.calendar}
      renderDay={renderDay}
    />
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