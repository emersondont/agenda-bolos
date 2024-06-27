import { View } from "react-native"
import { Text, Button, Modal } from "@ui-kitten/components";
import React from "react";
import { Feather } from '@expo/vector-icons';

export type MonthYear = {
  month: number
  year: number
}

type Props = {
  monthYear: MonthYear
  handleChangeMonth: (monthYear: MonthYear) => void
}

const months = [
  { title: 'Jan', value: 0 },
  { title: 'Fev', value: 1 },
  { title: 'Mar', value: 2 },
  { title: 'Abr', value: 3 },
  { title: 'Mai', value: 4 },
  { title: 'Jun', value: 5 },
  { title: 'Jul', value: 6 },
  { title: 'Ago', value: 7 },
  { title: 'Set', value: 8 },
  { title: 'Out', value: 9 },
  { title: 'Nov', value: 10 },
  { title: 'Dez', value: 11 }
]

export default function MonthPicker({ monthYear, handleChangeMonth }: Props) {
  const [visible, setVisible] = React.useState(false)
  const [year, setYear] = React.useState(monthYear.year)

  const toString = (monthYear: MonthYear) => {
    return `${months[monthYear.month].title}/${monthYear.year}`
  }

  const sameMonth = (month: number) => { 
    return month === monthYear.month && year === monthYear.year
  }

  return (
    <View>
      <Button
        status='basic'
        onPress={() => setVisible(true)}
      >
        {toString(monthYear)}
      </Button>

      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setVisible(false)}
        animationType='fade'
        style={{ backgroundColor: 'white', alignItems: 'center', gap: 12, padding: 12, width: '80%'}}
      >

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Button
            appearance="ghost"
            accessoryLeft={<Feather name="arrow-left" size={24} color="black" />}
            onPress={() => { setYear(year - 1) }}
          />
          <Text category="h6">{year}</Text>
          <Button
            appearance="ghost"
            accessoryRight={<Feather name="arrow-right" size={24} color="black" />}
            onPress={() => { setYear(year + 1) }}
          />
        </View>

        <View
          style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {
            months.map((month, index) => (
              <Button
                key={index}
                appearance={sameMonth(month.value) ? 'outline' : 'ghost'}
                status={sameMonth(month.value) ? 'primary' : 'basic'}
                onPress={() => {
                  handleChangeMonth({
                    month: month.value,
                    year
                  })
                  setVisible(false)
                }}
              >
                {month.title}
              </Button>
            ))
          }
        </View>

      </Modal>
    </View>
  )
}