import { Card, Modal } from "@ui-kitten/components";
import { CakeSchema, CakeType, cakeSchema } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CakeForm from "../forms/cake/cakeForm";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Progress } from "../forms/buttonSubmit";

interface Props {
  cake: CakeType
  visible: boolean
  setVisible: (visible: boolean) => void
}

export default function CakeModal(props: Props) {
  const [disabled, setDisabled] = useState(true)
  const [progressStatus, setProgressStatus] = useState<Progress>('default')
  const cakeDatabase = useCakeDatabase()
  const { control, handleSubmit, setError, reset, formState: { errors } } = useForm<CakeSchema>({
    resolver: zodResolver(cakeSchema),
    defaultValues: {...props.cake,
      deliveryDate: new Date(props.cake.deliveryDate)
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync: deleteCakeFn } = useMutation({
    mutationFn: cakeDatabase.remove,
    onSuccess(data, variables) {
      queryClient.setQueryData(['cakes'], (cakes: CakeType[]) => {
        return cakes.filter(cake => cake.id !== variables)
      })
      queryClient.setQueryData(['cakesMonth'], (cakes: CakeType[]) => {
        return cakes.filter(cake => cake.id !== variables)
      })
    }
  })
  const { mutateAsync: updateCakeFn } = useMutation({
    mutationFn: cakeDatabase.update,
    onSuccess(data, variables) {
      queryClient.setQueryData(['cakes'], (cakes: CakeType[]) => {
        const deliveryDate = new Date(variables.deliveryDate);
        deliveryDate.setHours(0, 0, 0, 0);

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        cakes = cakes.map(cake => {
          if (cake.id === variables.id) {
            return data
          }
          return cake
        })

        //verifica se a data de entrega é maior ou igual a data atual
        if (deliveryDate >= currentDate) {
          cakes.filter(cake => cake.id !== variables.id)
        }
        return cakes
      })

      queryClient.setQueryData(['cakesMonth'], (cakes: CakeType[]) => {
        cakes = cakes.map(cake => {
          if (cake.id === variables.id) {
            return data
          }
          return cake
        })

        return cakes
      })
    }
  })

  const handleDelete = async () => {
    try {
      await deleteCakeFn(props.cake.id)
      props.setVisible(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate: SubmitHandler<CakeSchema> = async (data) => {
    const quantityFillings = data.fillings.split(';').length;
    try {
      await updateCakeFn({ ...data, quantityFillings, id: props.cake.id })
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
          title="Detalhes da Encomenda"
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
        <CakeForm control={control} errors={errors} disabled={disabled} />
      </Card>
    </Modal>
  )
}