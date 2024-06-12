import { Text, Button, IconElement, IconProps } from "@ui-kitten/components";
import { ViewProps, View} from "react-native";
import { AntDesign } from '@expo/vector-icons';

interface Props {
  title: string
  setVisibility: (visible: boolean) => void
}

const CloseIcon = (props: IconProps): IconElement => (
  <AntDesign {...props} name="close" size={22} color="black" />
);

export default function Header(props: Props & ViewProps) {
  return (
    <View {...props} style={[props.style, {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}]}>
      <Text category='h5'>
        {props.title}
      </Text>
      <Button
        accessoryRight={CloseIcon}
        appearance='ghost'
        onPress={() => props.setVisibility(false)}
      />
    </View>
  );
}
