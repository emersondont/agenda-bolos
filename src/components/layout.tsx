import { StyleSheet, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <View style={stylesLayout.container}>
      {children}
    </View>
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
