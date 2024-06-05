import { Datepicker } from "@ui-kitten/components";
import Label from "../../label";
import { localeDateService } from "../../calendar";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema } from "../../../types";
import ErrorMessage from "./errorMessage";

interface Props extends React.ComponentProps<typeof Datepicker> {
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
}

export default function DeliveryDatePicker(props: Props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange,value } }) => (
        <Datepicker
          label={evaProps => <Label {...evaProps} title="Data de entrega:" />}
          size="large"
          style={{
            flex: 1,
            width: "100%",
            marginBottom: 12
          }}
          dateService={localeDateService}
          onSelect={onChange}
          date={value}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
          {...props}
        />
      )}
    />
  );
}