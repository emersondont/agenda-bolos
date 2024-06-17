import { Control, FieldErrors } from "react-hook-form"
import { ScrollView, StyleSheet, View } from "react-native"
import { ExpenseSchema } from "../../../types"
import CustomInput from "../customInput"
import { Text } from "@ui-kitten/components";
import DatePicker from "../datePicker";

interface Props {
  control: Control<ExpenseSchema>
  errors: FieldErrors<ExpenseSchema>
  disabled?: boolean
}

export default function ExpenseForm({ control, errors, disabled }: Props) {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.div}>
        <CustomInput
          title="Produto"
          control={control}
          name="product"
          error={errors.product}
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
      </View>
      <View style={styles.div}>
        <CustomInput
          title="Quantidade"
          control={control}
          name="quantity"
          error={errors.quantity}
          disabled={disabled}
        />
        <DatePicker
          control={control}
          name="paymentDate"
          error={errors.paymentDate}
          disabled={disabled}
          labelText="Data"
        />
      </View>
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