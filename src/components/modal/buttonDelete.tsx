import { Modal, Button, Card, Text } from "@ui-kitten/components";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
  handleDelete: () => void
}

export default function ButtonDelete(props: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  return (
    <>
      <Button
        style={styles.button}
        status='danger'
        onPress={() => setModalIsOpen(true)}
      >
        Apagar
      </Button>
      <Modal
        visible={modalIsOpen}
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onBackdropPress={() => setModalIsOpen(false)}
        animationType='fade'
        style={styles.modal}
      >
        <Card
          header={<Text category="h6">Deseja realmente apagar?</Text>}
          style={{width: '80%'}}
        >
          <View style={styles.modal}>
            <Button
              style={styles.button}
              status='basic'
              onPress={() => setModalIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              style={styles.button}
              status='danger'
              onPress={props.handleDelete}
            >
              Apagar
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    gap: 6,
    width: '100%',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    width: '100%'
  },
});