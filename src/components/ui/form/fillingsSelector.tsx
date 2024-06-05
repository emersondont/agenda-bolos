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

const fillings = [
  { id: "1", name: "Chocolate" },
  { id: "2", name: "Nata" },
  { id: "3", name: "Filling 3" },
];

export default function FillingsSelector(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath[]>([]);

  const onSelect = (index: IndexPath[]) => {
    setSelectedIndex(index);
    let selecteds = index.reduce((accumulator, currentIndex) => {
      return accumulator + (accumulator ? '; ' : '') + fillings[currentIndex.row].name;
    }, '');
    return selecteds;
  }

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Select
          label={evaProps => <Label {...evaProps} title="Recheios:" />}
          style={{ width: "100%", marginBottom: 12 }}
          placeholder="Recheios"
          size="large"
          multiSelect={true}
          value={value as string}
          selectedIndex={selectedIndex}
          onSelect={(index) => onChange(onSelect(index as IndexPath[]))}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
          {...props}
        >
          {fillings.map((filling) => (
            <SelectItem key={filling.id} title={filling.name} />
          ))}
        </Select>
      )}
    />
  )
}