import { Button, Spinner } from "@ui-kitten/components";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FieldErrors } from "react-hook-form";

type progress = 'loading' | 'success' | 'error' | 'default'

interface Props extends React.ComponentProps<typeof Button> {
  handleSubmit: () => void
  errors: FieldErrors
}

const LoadingIndicator = (): React.ReactElement => (
  <Spinner size='small' status="basic" />
);
const LoadingIndicatorSuccess = (): React.ReactElement => (
  <Feather name="check" size={20} color="white" />
);
const LoadingIndicatorError = (): React.ReactElement => (
  <MaterialIcons name="error-outline" size={20} color="white" />
);

export default function ButtonSubmit(props: Props) {
  const [progressStatus, setProgressStatus] = useState<progress>('default')

  const handleSubmit = async (event: GestureResponderEvent) => {
    setProgressStatus('loading')

    await new Promise<void>(resolve => setTimeout(async () => {
      await props.handleSubmit()
      resolve()
    }, 400))

    if (Object.keys(props.errors).length !== 0) {
      setProgressStatus('error')
    } else {
      setProgressStatus('success')
    }
  }

  return (
    <Button
      style={{
        marginTop: 12,
        width: "100%"
      }}
      onPress={handleSubmit}
      accessoryRight={(() => {
        switch (progressStatus) {
          case 'loading':
            return LoadingIndicator;
          case 'success':
            return LoadingIndicatorSuccess;
          case 'error':
            return LoadingIndicatorError;
          default:
            return undefined;
        }
      })()}
      status={(() => {
        switch (progressStatus) {
          case 'loading':
            return 'primary';
          case 'success':
            return 'success';
          case 'error':
            return 'danger';
          default:
            return undefined;
        }
      })()}
      {...props}
    >
      {progressStatus === 'success' ? 'SALVO' : 'SALVAR'}
    </Button>
  )

}

