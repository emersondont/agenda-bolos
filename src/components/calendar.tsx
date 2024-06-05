import { StyleSheet } from "react-native";
import { Calendar, I18nConfig, NativeDateService } from "@ui-kitten/components";
import { useState } from "react";

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
}

export default function Calendar_(props: Props) {
  const [date, setDate] = useState(new Date());
  
  return (
    <Calendar
      dateService={localeDateService}
      date={props.date}
      onSelect={nextDate => props.setDate(nextDate)}
      style={styles.calendar}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    marginBottom: 12,
    backgroundColor: "#fff",
  }
});