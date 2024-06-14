import { StyleSheet, Text, View } from "react-native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <ApplicationProvider {...eva} theme={eva.light} >
      <View style={stylesLayout.container}>
        {children}
      </View>
    </ApplicationProvider>
  );
}

export const stylesLayout = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    width: "100%",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    width: "100%",
  }
});
