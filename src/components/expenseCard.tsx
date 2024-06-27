import React from "react";
import { Card, Text } from "@ui-kitten/components";
import { View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { ExpenseType } from "../types";
import ExpenseModal from "./modal/expenseModal";

interface Props {
  expense: ExpenseType
}

export default function ExpenseCard({ expense }: Props) {
  const [visible, setVisible] = React.useState(false);
  const date = new Date(expense.paymentDate)
  return (
    <Animated.View entering={FadeIn.duration(200)}>
      <Card
        style={{ marginBottom: 6 }}
        onPress={() => setVisible(true)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', width: '70%' }}>
            <Text category='label' appearance="hint">
              {date.toISOString().slice(8, 10)}/{date.toISOString().slice(5, 7)}
            </Text>
            <Text category='p1' numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: '50%' }}>
              {expense.product}
            </Text>
            <Text category='p1' numberOfLines={1} ellipsizeMode="tail" style={{ maxWidth: '30%' }}>
              {expense.quantity}
            </Text>
          </View>
          <Text category='h6' status="danger">
            {expense.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </Text>
        </View>
      </Card>

      {
        visible && (
          <ExpenseModal
            expense={expense}
            visible={visible}
            setVisible={setVisible}
          />
        )
      }

    </Animated.View>
  )
}