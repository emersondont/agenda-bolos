import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import Layout from "../../components/layout";
import { useExpensesDatabase } from "../../database/useExpenseDatabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import MonthPicker, { MonthYear } from "../../components/monthPicker";
import { useState } from "react";

export default function Finances() {
  const expenseDatabase = useExpensesDatabase()
  const cakeDatabase = useCakeDatabase()
  const queryClient = useQueryClient()
  const { data: expenses } = useQuery({
    queryKey: ["expensesFinances"],
    queryFn: () => expenseDatabase.getByMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() }),
  })
  const { mutateAsync: updateArrayExpenses } = useMutation({
    mutationFn: expenseDatabase.getByMonth,
    onSuccess(data, _) {
      queryClient.setQueryData(["expensesFinances"], () => {
        return data
      })
    }
  });

  const { data: cakes } = useQuery({
    queryKey: ["cakesFinances"],
    queryFn: () => cakeDatabase.getByMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() })
  })
  const { mutateAsync: updateArrayCakes } = useMutation({
    mutationFn: cakeDatabase.getByMonth,
    onSuccess(data, _) {
      queryClient.setQueryData(["cakesFinances"], () => {
        return data
      })
    }
  });

  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })

  const countExpenses = () => {
    let total = 0
    expenses?.forEach((expense) => {
      total += expense.price
    })
    return total
  }

  const countCakes = () => {
    let total = 0
    cakes?.forEach((cake) => {
      total += cake.price
    })
    return total
  }

  const handleChangeMonth = async (monthYear: MonthYear) => {
    setMonthYear(monthYear)
    try {
      await updateArrayExpenses({ year: monthYear.year, month: monthYear.month + 1 })
      await updateArrayCakes({ year: monthYear.year, month: monthYear.month + 1 })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <Text category="h4">Finanças do mês:</Text>
        <MonthPicker
          monthYear={monthYear}
          handleChangeMonth={handleChangeMonth}
        />
      </View>

      <Text category="h5">Vendas de Bolos:</Text>
      <Text>
        Total de Bolos Vendidos: <Text category="h5">{String(cakes?.length)}</Text>
      </Text>
      <Text>
        Receita com Vendas:
        <Text category="h5" style={{ color: "#28a745" }}>
          {countCakes().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </Text>

      <Text category="h5" style={{ marginTop: 12 }}>Despesas:
        <Text category="h5" style={{ color: "#dc3545" }}>
          {countExpenses().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </Text>

      <Text category="h5" style={{ marginTop: 12 }}>Saldo Final do Mês:
        <Text category="h5" style={{ color: countCakes() - countExpenses() >= 0 ? "#28a745" : "#dc3545" }}>
          {(countCakes() - countExpenses()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
        </Text>
      </Text>
    </Layout>
  );
}

