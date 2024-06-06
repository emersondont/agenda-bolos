import { StyleSheet, View, ScrollView } from "react-native";
import Layout from "../../components/layout";
import { Text } from "@ui-kitten/components";
import CustomInput from "../../components/ui/form/customInput";
import DeliveryDatePicker from "../../components/ui/form/deliveryDatePicker";
import DeliveryTimePicker from "../../components/ui/form/deliveryTimePicker";
import FillingsSelector from "../../components/ui/form/fillingsSelector";
import BatterSelector from "../../components/ui/form/batterSelector";
import BatterQuantitySelector from "../../components/ui/form/batterQuantitySelector";
import ButtonSubmit, { progress } from "../../components/ui/form/buttonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { CakeSchema, cakeSchema } from "../../types";
import { zodResolver } from '@hookform/resolvers/zod'
import Cake from "../../services/Cake";
import { useState } from "react";

export default function NewCake() {
  const [progressStatus, setProgressStatus] = useState<progress>('default')
  const { control, handleSubmit, setError, formState: { errors } } = useForm<CakeSchema>({
    resolver: zodResolver(cakeSchema)
  })

  const handleNewCake: SubmitHandler<CakeSchema> = async (data) => {
    const quantityFillings = data.fillings.split(';').length;

    try {
      const res = await Cake.create({ ...data, quantityFillings })
      setProgressStatus('success')
    } catch (error) {
      setError("root", { message: String(error) })
    }
  }
  const onError = () => {
    setProgressStatus('error')
  }

  return (
    <Layout>
      <Text category="h4" style={{marginBottom: 12}}>Agendar encomenta</Text>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <CustomInput
          title="Nome do Cliente"
          control={control}
          name="customer"
          error={errors.customer}
        />
        <CustomInput
          title="Preço"
          inputMode="numeric"
          accessoryLeft={() => <Text>R$</Text>}
          control={control}
          name="price"
          error={errors.price}
        />

        <View style={styles.div}>
          <DeliveryDatePicker
            control={control}
            name="deliveryDate"
            error={errors.deliveryDate}
          />
          <DeliveryTimePicker
            control={control}
            name="deliveryHour"
            error={errors.deliveryHour}
          />
        </View>

        <FillingsSelector
          control={control}
          name="fillings"
          error={errors.fillings}
        />

        <View style={styles.div}>
          <BatterSelector
            control={control}
            name="batter"
            error={errors.batter}
          />
          <BatterQuantitySelector
            control={control}
            name="quantityBatters"
            error={errors.quantityBatters}
          />
        </View>
        <CustomInput
          title="Anotações"
          multiline={true}
          control={control}
          name="description"
          error={undefined}
        />

        <ButtonSubmit
          handleSubmit={handleSubmit(handleNewCake, onError)}
          errors={errors}
          progressStatus={progressStatus}
          setProgressStatus={setProgressStatus}
        />

      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  div: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
  main: {
    flex: 1,
  }
});

