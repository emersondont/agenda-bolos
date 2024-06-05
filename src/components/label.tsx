import { Text } from "@ui-kitten/components";
interface Props {
  title: string
}
export default function Label({ title }: Props) {
  return (
    <Text category="h6">{title}</Text>
  );
}
