import { StyleSheet, View, ScrollView } from "react-native";
import Layout, { stylesLayout } from "../../components/layout";
import { Text, Button, } from "@ui-kitten/components";
import CustomInput from "../../components/ui/form/customInput";
import DeliveryDatePicker from "../../components/ui/form/deliveryDatePicker";
import DeliveryTimePicker from "../../components/ui/form/deliveryTimePicker";
import FillingsSelector from "../../components/ui/form/fillingsSelector";
import BatterSelector from "../../components/ui/form/batterSelector";
import BatterQuantitySelector from "../../components/ui/form/batterQuantitySelector";
import ButtonSubmit from "../../components/ui/form/buttonSubmit";
import { SubmitHandler, useForm } from "react-hook-form";
import { CakeSchema, cakeSchema } from "../../types";
import { zodResolver } from '@hookform/resolvers/zod'

export default function NewCake() {
  const { register, control, handleSubmit, setError, formState: { errors }, getValues } = useForm<CakeSchema>({
    resolver: zodResolver(cakeSchema)
  })

  const handleNewCake: SubmitHandler<CakeSchema> = async (data) => {
    
  }
  const onError = () => {
    console.log(errors)
  }

  return (
    <Layout>
      <Text style={stylesLayout.title}>Agendar encomenta</Text>

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

        <ButtonSubmit handleSubmit={handleSubmit(handleNewCake, onError)} errors={errors}/>

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

