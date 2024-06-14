import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";
import Label from "../label";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema } from "../../../types";
import ErrorMessage from "../errorMessage";

interface Props extends React.ComponentProps<typeof Autocomplete> {
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
}

const times = [
  { title: 'Manhã' },
  { title: 'Tarde' },
  { title: 'Noite' }
];

export default function DeliveryTimePicker(props: Props) {
  const onSelect = (index: number) => {
    return times[index].title
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          label={evaProps => <Label {...evaProps} title="Hora de entrega:" />}
          placeholder="Hora de Entrega"
          size="large"
          // placement="bott"
          style={{
            width: "100%",
            // marginBottom: 12,
          }}
          value={value as string}
          onSelect={index => onChange(onSelect(index))}
          onChangeText={onChange}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
          {...props}
        >
          {times.map((time, index) => (
            <AutocompleteItem key={index} title={time.title} />
          ))}
        </Autocomplete>
      )}
    />
  )
} 