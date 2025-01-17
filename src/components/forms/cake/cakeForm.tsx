import { ScrollView, View, StyleSheet } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import { Text } from "@ui-kitten/components";
import { CakeSchema } from "../../../types";
import CustomInput from "../customInput";
import DatePicker from "../datePicker";
import DeliveryTimePicker from "./deliveryTimePicker";
import FillingsSelector from "./fillingsSelector";
import BatterSelector from "./batterSelector";
import BatterQuantitySelector from "./batterQuantitySelector";
import IcingSelector from "./icingSelector";

interface Props {
  control: Control<CakeSchema>
  errors: FieldErrors<CakeSchema>
  disabled?: boolean
}

export default function CakeForm({ control, errors, disabled }: Props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <CustomInput
        title="Nome do Cliente"
        control={control}
        name="customer"
        error={errors.customer}
        disabled={disabled}
      />
      <CustomInput
        title="Preço"
        inputMode="numeric"
        accessoryLeft={() => <Text>R$</Text>}
        control={control}
        name="price"
        error={errors.price}
        disabled={disabled}
      />

      <View style={styles.div}>
        <DatePicker
          control={control}
          name="deliveryDate"
          error={errors.deliveryDate}
          disabled={disabled}
          labelText="Data de Entrega"
        />
        <DeliveryTimePicker
          control={control}
          name="deliveryHour"
          error={errors.deliveryHour}
          disabled={disabled}
        />
      </View>

      <FillingsSelector
        control={control}
        name="fillings"
        error={errors.fillings}
        disabled={disabled}
      />
      
      <IcingSelector
        control={control}
        name="icing"
        error={errors.icing}
        disabled={disabled}
      />

      <View style={styles.div}>
        <BatterSelector
          control={control}
          name="batter"
          error={errors.batter}
          disabled={disabled}
        />
        <BatterQuantitySelector
          control={control}
          name="quantityBatters"
          error={errors.quantityBatters}
          disabled={disabled}
        />
      </View>
      <CustomInput
        title="Anotações"
        multiline={true}
        control={control}
        name="description"
        error={undefined}
        disabled={disabled}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  div: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    gap: 12,
  },
});