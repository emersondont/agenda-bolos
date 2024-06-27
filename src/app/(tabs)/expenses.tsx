import Layout from "../../components/layout";
import { Text, Button } from "@ui-kitten/components";
import ButtonSubmit, { Progress } from "../../components/forms/buttonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import ExpenseForm from "../../components/forms/expense/expenseForm";
import { useState } from "react";
import { ExpenseSchema, ExpenseType, expenseSchema } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollView, View } from "react-native";
import ExpenseCard from "../../components/expenseCard";
import Animated, { FadeInDown } from "react-native-reanimated";
import Header from "../../components/modal/header";
import { useExpensesDatabase } from "../../database/useExpenseDatabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MonthPicker, { MonthYear } from "../../components/monthPicker";

export default function Expenses() {
  const [progressStatus, setProgressStatus] = useState<Progress>('default')
  const [newExpense, setNewExpense] = useState(false)
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  })
  const { control, handleSubmit, setError, formState: { errors }, reset } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {}
  })
  const expenseDatabase = useExpensesDatabase()
  const { data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => expenseDatabase.getByMonth({ month: new Date().getMonth() + 1, year: new Date().getFullYear() }),
  })
  const queryClient = useQueryClient()
  const { mutateAsync: createExpenseFn } = useMutation({
    mutationFn: expenseDatabase.create,
    onSuccess(data, variables) {
      queryClient.setQueryData(["expenses"], (expenses: ExpenseType[]) => {

        if (variables.paymentDate.getMonth() === monthYear.month &&
          variables.paymentDate.getFullYear() === monthYear.year) {
          expenses = [...expenses, {
            ...variables,
            id: data.id
          }]

          expenses.sort((a, b) => {
            const dateA = new Date(a.paymentDate);
            const dateB = new Date(b.paymentDate);
            return dateA.getTime() - dateB.getTime();
          })
        }
        return expenses
      })
    }
  })
  const { mutateAsync: updateArrayExpenses } = useMutation({
    mutationFn: expenseDatabase.getByMonth,
    onSuccess(data, _) {
      queryClient.setQueryData(["expenses"], () => {
        return data
      })
    }
  });

  const handleNewExpense: SubmitHandler<ExpenseSchema> = async (data) => {
    try {
      await createExpenseFn(data)
      setProgressStatus('success')
      setTimeout(() => {
        setProgressStatus('default')
        reset()
      }, 400)
    } catch (error) {
      setError("root", { message: String(error) })
    }
  }

  const onError = () => {
    setProgressStatus('error')
  }

  const handleChangeMonth = async (monthYear: MonthYear) => {
    setMonthYear(monthYear)
    try {
      await updateArrayExpenses({ year: monthYear.year, month: monthYear.month + 1 })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <View style={{ flexDirection: 'row', alignItems: "center", gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <Text category="h4">Gastos do mês:</Text>
        <MonthPicker
          monthYear={monthYear}
          handleChangeMonth={handleChangeMonth}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginBottom: 12 }}>
        {
          expenses?.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        }
      </ScrollView>

      {
        newExpense ? (
          <Animated.View entering={FadeInDown.duration(400)}>
            <Header title="Adicionar:" handleClose={() => setNewExpense(false)} />
            <ExpenseForm control={control} errors={errors} />

            <ButtonSubmit
              handleSubmit={handleSubmit(handleNewExpense, onError)}
              errors={errors}
              progressStatus={progressStatus}
              setProgressStatus={setProgressStatus}
            />
          </Animated.View>
        ) :
          <Button onPress={() => setNewExpense(true)} style={{marginBottom: 12}}>Adicionar</Button>
      }
    </Layout>
  );
}
