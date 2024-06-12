import { StyleSheet, ScrollView, Pressable } from "react-native";
import CakeCard from "../../components/cakeCard";
import { Feather } from '@expo/vector-icons';
import Layout from "../../components/layout";
import { Text } from "@ui-kitten/components";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { Link } from 'expo-router';
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const cakeDatabase = useCakeDatabase()
  const { data: cakes } = useQuery({
    queryKey: ["cakes"],
    queryFn: cakeDatabase.all
  })

  return (
    <Layout>
      <Text category="h4" style={{ marginBottom: 12 }}>Próximos bolos:</Text>

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {cakes && cakes.map((cake) =>
          <CakeCard key={cake.id} cake={cake} />
        )}
      </ScrollView>

      <Pressable style={styles.button}>
        <Link href="/calendarPage">
          <Feather name="calendar" size={32} color={'#fff'} />
        </Link>
      </Pressable>
    </Layout>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    backgroundColor: "#007aff",
    padding: 12,
    position: "absolute",
    bottom: 24,
    right: 24,
  }
});
