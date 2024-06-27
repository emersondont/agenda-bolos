import { Card, Modal, ModalService } from "@ui-kitten/components";
import { ExpenseSchema, ExpenseType, expenseSchema } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "../forms/buttonSubmit";
import ExpenseForm from "../forms/expense/expenseForm";
import { useExpensesDatabase } from "../../database/useExpenseDatabase";

interface Props {
  expense: ExpenseType
  visible: boolean
  setVisible: (visible: boolean) => void
}

ModalService.setShouldUseTopInsets = true

export default function ExpenseModal(props: Props) {
  const [disabled, setDisabled] = useState(true)
  const [progressStatus, setProgressStatus] = useState<Progress>('default')
  const expenseDatabase = useExpensesDatabase()
  const { control, handleSubmit, setError, reset, formState: { errors } } = useForm<ExpenseSchema>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      ...props.expense,
      paymentDate: new Date(props.expense.paymentDate)
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync: deleteExpenseFn } = useMutation({
    mutationFn: expenseDatabase.remove,
    onSuccess(data, variables) {
      queryClient.setQueryData(['expenses'], (expenses: ExpenseType[]) => {
        return expenses.filter(expense => expense.id !== variables)
      })
    }
  })
  const { mutateAsync: updateExpenseFn } = useMutation({
    mutationFn: expenseDatabase.update,
    onSuccess(data, variables) {
      queryClient.setQueryData(['expenses'], (expenses: ExpenseType[]) => {
        expenses = expenses.map(expense => {
          if (expense.id === variables.id) {
            return data
          }
          return expense
        })
        return expenses
      })
    }
  })

  const handleDelete = async () => {
    try {
      await deleteExpenseFn(props.expense.id)
      props.setVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate: SubmitHandler<ExpenseSchema> = async (data) => {
    try {
      await updateExpenseFn({ ...data, id: props.expense.id })
      setProgressStatus('success')
      setTimeout(() => {
        props.setVisible(false)
        setDisabled(true)
        setProgressStatus('default')
      }, 400)
    } catch (error) {
      setError("root", { message: String(error) })
    }
  }
  const onError = () => {
    setProgressStatus('error')
  }

  const handleClose = () => {
    props.setVisible(false)
    setDisabled(true)
    setProgressStatus('default')
    reset()
  }

  return (
    <Modal
      visible={props.visible}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onBackdropPress={handleClose}
      animationType='fade'
    >
      <Card
        header={<Header
          title="Detalhes da despesa:"
          handleClose={handleClose}
        />}
        footer={<Footer
          setDisabled={setDisabled}
          errors={errors}
          handleDelete={handleDelete}
          handleUpdate={handleSubmit(handleUpdate, onError)}
          progressStatus={progressStatus}
          setProgressStatus={setProgressStatus}
          reset={reset}
        />}
      >
        <ExpenseForm control={control} errors={errors} disabled={disabled} />
      </Card>
    </Modal>
  )
}