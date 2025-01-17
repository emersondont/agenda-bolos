import { Datepicker } from "@ui-kitten/components";
import Label from "./label";
import { localeDateService } from "../calendar";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema, ExpenseSchema } from "../../types";
import ErrorMessage from "./errorMessage";

interface Props extends React.ComponentProps<typeof Datepicker> {
  control: Control<any> //Control<CakeSchema> | Control<ExpenseSchema>
  name: keyof CakeSchema | keyof ExpenseSchema
  error: FieldError | undefined
  labelText: string
}

export default function DatePicker(props: Props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange,value } }) => (
        <Datepicker
          label={evaProps => <Label {...evaProps} title={props.labelText + ':'} />}
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