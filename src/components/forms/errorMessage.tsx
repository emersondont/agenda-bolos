import { Text } from '@ui-kitten/components';
interface Props {
  message: string
}
export default function ErrorMessage({ message }: Props) {
  return (
    <Text
      category='c1'
      status='danger'
    >
      {message}
    </Text>
  )
}