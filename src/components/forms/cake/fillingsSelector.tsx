import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
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
          onFocus={() => setIndexThroughDefaultValue(value as string)}
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