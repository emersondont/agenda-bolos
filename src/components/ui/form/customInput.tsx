import {
  Input
} from "@ui-kitten/components";
import Label from "../../label";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema } from "../../../types";
import ErrorMessage from "./errorMessage";

interface Props extends React.ComponentProps<typeof Input> {
  title: string,
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
}

export default function CustomInput(props: Props) {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => (
        <Input
          label={evaProps => <Label {...evaProps} title={props.title + ':'} />}
          style={{ width: "100%", marginBottom: 12}}
          placeholder={props.title}
          size="large"
          onChangeText={onChange}
          blurOnSubmit={true}
          value={value ? String(value) : ''}
          status={props.error ? 'danger' : 'basic'}
          caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
          {...props}
        />
      )}
    />
  );
}