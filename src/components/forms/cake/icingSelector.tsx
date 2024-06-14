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

const icings = [
  { id: "1", name: "Merengue" },
  { id: "2", name: "Chantilly" },
  { id: "3", name: "Nata" },
];

export default function IcingSelector(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | undefined>();

  const onSelect = (index: IndexPath) => {
    setSelectedIndex(index);
    return icings[index.row].name;
  }

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Select
          label={evaProps => <Label {...evaProps} title="Cobertura:" />}
          style={{ flex: 1, width: "100%", marginBottom: 12}}
          placeholder="Cobertura:"
          size="large"
          value={value as string}
          selectedIndex={selectedIndex}
          onSelect={(index) => onChange(onSelect(index as IndexPath))}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}          
          {...props}
        >
          {icings.map((icing) => (
            <SelectItem key={icing.id} title={icing.name} />
          ))}
        </Select>
      )}
    />
  )
}