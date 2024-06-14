import { View, ViewProps, StyleSheet } from "react-native";
import { Button } from "@ui-kitten/components";
import { FieldErrors } from "react-hook-form";
import { useState } from "react";
import ButtonSubmit, { Progress } from "../forms/buttonSubmit";
import ButtonDelete from "./buttonDelete";

interface Props {
  setDisabled: (visible: boolean) => void;
  errors: FieldErrors;
  handleDelete: () => void;
  handleUpdate: () => void;
  progressStatus: Progress;
  setProgressStatus: (status: Progress) => void;
  reset: () => void;
}

export default function Footer(props: Props & ViewProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = () => {
    setIsEditing(true)
    props.setDisabled(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    props.setDisabled(true)
    props.setProgressStatus('default')
    props.reset()
  }

  return (
    <View
      {...props}
      style={[props.style, styles.view]}
    >
      {
        isEditing ?
          <>
            <Button
              style={styles.button}
              status='basic'
              onPress={handleCancel}
            >
              Cancelar
            </Button>
            <ButtonSubmit
              handleSubmit={props.handleUpdate}
              errors={props.errors}
              progressStatus={props.progressStatus}
              setProgressStatus={props.setProgressStatus}
              style={styles.button}
            />
          </>
          :
          <>
            <Button
              style={styles.button}
              status='basic'
              onPress={handleEdit}
            >
              Editar
            </Button>
            <ButtonDelete
              handleDelete={props.handleDelete}
            />
          </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    flex: 1,
    gap: 6,
  },
  button: {
    flex: 1,
    width: '100%'
  },
});