import { Card, Modal } from "@ui-kitten/components";
import { CakeSchema, CakeType, cakeSchema } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CakeForm from "../ui/form/cakeForm";
import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  cake: CakeType
  visible: boolean
  setVisible: (visible: boolean) => void
}

export default function CakeModal(props: Props) {
  const [disabled, setDisabled] = useState(true)
  const cakeDatabase = useCakeDatabase()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<CakeSchema>({
    resolver: zodResolver(cakeSchema),
    defaultValues: {
      ...props.cake,
      deliveryDate: new Date(props.cake.deliveryDate),
    }
  })
  const queryClient = useQueryClient()
  const { mutateAsync: deleteCakeFn } = useMutation({
    mutationFn: cakeDatabase.remove,
    onSuccess(data, variables) {
      queryClient.setQueryData(["cakes"], (cakes: CakeType[]) => {
        return cakes.filter(cake => cake.id !== variables)
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

  return (
    <Modal
      visible={props.visible}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onBackdropPress={() => props.setVisible(false)}
    >
      <Card
        header={<Header title="Detalhes da Encomenda" setVisibility={props.setVisible}/>}
        footer={<Footer setDisabled={setDisabled} errors={errors} handleDelete={handleDelete}/>}
      >
        <CakeForm control={control} errors={errors} disabled={disabled} />
      </Card>
    </Modal>
  )
}