import Calendar from "../../components/calendar";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { ScrollView } from "react-native";
import CakeCard from "../../components/cakeCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Animated, { FadeInUp } from 'react-native-reanimated';

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [key, setKey] = useState(new Date().getTime());
  const cakeDatabase = useCakeDatabase()
  const queryClient = useQueryClient()
  const { data: cakes } = useQuery({
    queryKey: ["cakesMonth"],
    queryFn: () => cakeDatabase.getByMonth({ month: date.getMonth() + 1, year: date.getFullYear() }),
  });

  const { mutateAsync: updateArrayCakes } = useMutation({
    mutationFn: cakeDatabase.getByMonth,
    onSuccess(data, _) {
      queryClient.setQueryData(["cakesMonth"], () => {
        return data
      })
    }
  });
  const fetchCakes = async (d: Date) => {
    setDate(d);
    try {
      await updateArrayCakes({
        month: d.getMonth() + 1,
        year: d.getFullYear()
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setKey(new Date().getTime()); // to force re-render
  }, [cakes])

  return (
    <Layout>
      <Animated.View entering={FadeInUp.duration(400)}>
        <Calendar
          date={date}
          setDate={setDate}
          fetchCakes={fetchCakes}
          cakes={cakes}
          key={key}
        />
      </Animated.View>

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {cakes && cakes.map((cake) => {
          return new Date(cake.deliveryDate).toISOString().split('T')[0] === date.toISOString().split('T')[0] &&
            <CakeCard key={cake.id} cake={cake} />;
        })}
      </ScrollView>
    </Layout >
  )
}