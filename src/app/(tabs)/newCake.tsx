import Layout from "../../components/layout";
import { Text } from "@ui-kitten/components";
import ButtonSubmit, { Progress } from "../../components/forms/buttonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { CakeSchema, CakeType, cakeSchema } from "../../types";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import CakeForm from "../../components/forms/cake/cakeForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function NewCake() {
  const [progressStatus, setProgressStatus] = useState<Progress>('default')
  const { control, handleSubmit, setError, reset, formState: { errors } } = useForm<CakeSchema>({
    resolver: zodResolver(cakeSchema),
    defaultValues: {}
  }) 
  const cakeDatabase = useCakeDatabase()
  const queryClient = useQueryClient()
  const { mutateAsync: createCakeFn } = useMutation({
    mutationFn: cakeDatabase.create,
    onSuccess(data, variables) {
      queryClient.setQueryData(["cakes"], (cakes: CakeType[]) => {
        return [...cakes, {
          ...variables,
          id: data.id
        }]
      })
    }
  })

  const handleNewCake: SubmitHandler<CakeSchema> = async (data) => {
    const quantityFillings = data.fillings.split(';').length;
    try {
      await createCakeFn({ ...data, quantityFillings })
      setProgressStatus('success')
      reset() 
    } catch (error) {
      setError("root", { message: String(error) })
    }
  }
  const onError = () => {
    setProgressStatus('error')
  }

  return (
    <Layout>
      <Text category="h4" style={{ marginBottom: 12 }}>Agendar encomenta</Text>

      <CakeForm control={control} errors={errors} />

      <ButtonSubmit
        handleSubmit={handleSubmit(handleNewCake, onError)}
        errors={errors}
        progressStatus={progressStatus}
        setProgressStatus={setProgressStatus}
      />
    </Layout>
  );
}

