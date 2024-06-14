import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import Label from "../label";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema } from "../../../types";
import { useState } from "react";
import ErrorMessage from "../errorMessage";

interface Props extends React.ComponentProps<typeof Select> {
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
}

const batters = [
  { id: "1", name: "Mista" },
  { id: "2", name: "Branca" },
  { id: "3", name: "Preta" },
];

export default function BatterSelector(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>();

  const onSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    return batters[index.row].name;
  }

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Select
          label={evaProps => <Label {...evaProps} title="Massas:" />}
          style={{ flex: 1, width: "100%", marginBottom: 12}}
          placeholder="Massas:"
          size="large"
          value={value as string}
          selectedIndex={selectedIndex}
          onSelect={(index) => onChange(onSelect(index as IndexPath))}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}          
          {...props}
        >
          {batters.map((batter) => (
            <SelectItem key={batter.id} title={batter.name} />
          ))}
        </Select>
      )}
    />
  )
}