import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { CakeType } from "../../types";
import CakeCard from "../../components/cakeCard";
import { Feather } from '@expo/vector-icons';
import Calendar from "../../components/calendar";
import Layout from "../../components/layout";
import { Text } from "@ui-kitten/components";
import Cake from "../../services/Cake";

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [cakes, setCakes] = useState<CakeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenCalendar = () => {
    setIsLoading(!showCalendar)
    setShowCalendar(!showCalendar);
  }

  useEffect(() => {
    const fetchCakes = async () => {
      try {
        const res = await Cake.all();
        setCakes(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCakes();
  }, []);

  return (
    <Layout>
      {showCalendar && (
        <Calendar
          date={date}
          setDate={setDate}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      <Text category="h4" style={{ marginBottom: 12 }}>Próximos bolos:</Text>

      <ScrollView style={styles.main} showsVerticalScrollIndicator={false} key={cakes.length + (showCalendar ? 1 : 0)}>
        {cakes.map((cake) =>
          showCalendar ?
            new Date(cake.deliveryDate).toDateString() === date.toDateString() ?
              <CakeCard key={cake.id} cake={cake} isLoading={isLoading} />
              : null
            :
            (
              <CakeCard key={cake.id} cake={cake} isLoading={isLoading} />
            ))
        }
      </ScrollView>

      <Pressable
        style={styles.button}
        onPress={handleOpenCalendar}
      >
        <Feather name="calendar" size={32} color={'#fff'} />
      </Pressable>

    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    width: "100%",
  },
  main: {
    flex: 1,
    width: "100%",

  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  button: {
    borderRadius: 12,
    backgroundColor: "#007aff",
    padding: 12,
    position: "absolute",
    bottom: 24,
    right: 24,
  }
});
