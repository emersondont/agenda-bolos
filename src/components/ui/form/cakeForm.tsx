import { ScrollView, View, StyleSheet } from "react-native";
import { Control, FieldErrors, DefaultValues } from "react-hook-form";
import { Text } from "@ui-kitten/components";
import { CakeSchema } from "../../../types";
import CustomInput from "./customInput";
import DeliveryDatePicker from "./deliveryDatePicker";
import DeliveryTimePicker from "./deliveryTimePicker";
import FillingsSelector from "./fillingsSelector";
import BatterSelector from "./batterSelector";
import BatterQuantitySelector from "./batterQuantitySelector";

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
        <DeliveryDatePicker
          control={control}
          name="deliveryDate"
          error={errors.deliveryDate}
          disabled={disabled}
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