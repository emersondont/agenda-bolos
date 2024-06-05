import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import Label from "../../label";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema } from "../../../types";
import { useState } from "react";
import ErrorMessage from "./errorMessage";

interface Props extends React.ComponentProps<typeof Select> {
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
}

const quantitys = [
  { id: "1", name: "2" },
  { id: "2", name: "3" },
];

export default function BatterQuantitySelector(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>();

  const onSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    return quantitys[index.row].name;
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Select
          label={evaProps => <Label {...evaProps} title="Quant. de massas:" />}
          style={{ flex: 1, width: "100%", marginBottom: 12}}
          placeholder="Quantidade de massas:"
          size="large"
          value={value as string}
          selectedIndex={selectedIndex}
          onSelect={(index) => onChange(onSelect(index as IndexPath))}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
          {...props}
        >
          {quantitys.map((quantity) => (
            <SelectItem key={quantity.id} title={quantity.name} />
          ))}
        </Select>
      )}
    />
  )
}