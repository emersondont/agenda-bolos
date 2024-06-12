import { Card, Modal, Text, Button } from "@ui-kitten/components";
import { useState } from "react";
import { View, ViewProps, StyleSheet } from "react-native";
import ButtonSubmit, { Progress } from "../ui/form/buttonSubmit";
import { FieldErrors } from "react-hook-form";

interface Props {
  setDisabled: (visible: boolean) => void;
  errors: FieldErrors;
  handleDelete: () => void;
}

export default function Footer(props: Props & ViewProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [progressStatus, setProgressStatus] = useState<Progress>('default')


  const handleEdit = () => {
    setIsEditing(true)
    props.setDisabled(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    props.setDisabled(true)
  }

  const handleSubmit = async () => {
    setProgressStatus('success')
  }

  // const handleDelete = () => {
  //   props.handleDelete()
  // }

  return (
    <View
      style={styles.view}
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
              handleSubmit={handleSubmit}
              errors={props.errors}
              progressStatus={progressStatus}
              setProgressStatus={setProgressStatus}
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
            <Button
              style={styles.button}
              status='danger'
              onPress={props.handleDelete}
            >
              Apagar
            </Button>
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
    marginVertical: 12,
    paddingHorizontal: 12
  },
  button: {
    flex: 1,
    width: '100%'
  },
});