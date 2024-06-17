import { IndexPath, Select, SelectItem, Input } from "@ui-kitten/components";
import Label from "../label";
import { Control, Controller, FieldError } from "react-hook-form";
import { CakeSchema, FillingType } from "../../../types";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage";
import { useFillingDatabase } from "../../../database/useFillingDatabase";

interface Props extends React.ComponentProps<typeof Select> {
  control: Control<CakeSchema>
  name: keyof CakeSchema
  error: FieldError | undefined
  disabled?: boolean
}

export default function FillingsSelector(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath[]>([]);
  const [fillings, setFillings] = useState<FillingType[]>([]);
  const fillingDatabase = useFillingDatabase();

  const onSelect = (index: IndexPath[]) => {
    setSelectedIndex(index);
    let selecteds = index.reduce((accumulator, currentIndex) => {
      return accumulator + (accumulator ? '; ' : '') + fillings[currentIndex.row].name;
    }, '');
    return selecteds;
  }

  useEffect(() => {
    const fetchFillings = async () => {
      try {
        const res = await fillingDatabase.all();
        setFillings(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFillings();
  }, [])

  const setIndexThroughDefaultValue = (value: string) => {
    if (value) {
      const selecteds = value.split('; ');
      const indexes = selecteds.map((selected) => {
        return new IndexPath(fillings.findIndex((filling) => filling.name === selected))
      });
      setSelectedIndex(indexes);
    }
  }

  const renderInputMultiline = (value: string): React.ReactElement => {
    return (
      <Input
        label={evaProps => <Label {...evaProps} title="Recheios:" />}
        size="large"
        multiline={true}
        value={value}
        disabled
      />
    )
  }

  const renderSelect = (value: string, onChange: (...event: any[]) => void): React.ReactElement => {
    return (
      <Select
        label={evaProps => <Label {...evaProps} title="Recheios:" />}
        style={{ width: "100%", marginBottom: 12 }}
        placeholder="Recheios"
        size="large"
        multiSelect={true}
        value={value}
        selectedIndex={selectedIndex}
        onSelect={(index) => onChange(onSelect(index as IndexPath[]))}
        onFocus={() => setIndexThroughDefaultValue(value)}
        status={props.error ? 'danger' : 'basic'}
        caption={evaProps => (props.error ? <ErrorMessage {...evaProps} message="Campo obrigatório!" /> : <></>)}
        {...props}
      >
        {fillings.map((filling) => (
          <SelectItem key={filling.id} title={filling.name} />
        ))}
      </Select>
    )
  }

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value } }) => {
        return (
          props.disabled && value ?
            renderInputMultiline(value as string)
            :
            renderSelect(value as string, onChange)
        )
      }}
    />
  )
}