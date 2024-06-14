import Calendar from "../../components/calendar";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { CakeType } from "../../types";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { ScrollView } from "react-native";
import CakeCard from "../../components/cakeCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const cakeDatabase = useCakeDatabase()
  const queryClient = useQueryClient()
  const { data: cakes } = useQuery({
    queryKey: ["cakesMonth"],
    queryFn: () => cakeDatabase.getByMonth({ month: date.getMonth() + 1, year: date.getFullYear() }),
  });

  const { mutateAsync: updateArrayCakes } = useMutation({
    mutationFn: cakeDatabase.getByMonth,
    onSuccess(data, variables) {
      queryClient.setQueryData(["cakesMonth"], (cakes: CakeType[]) => {
        return cakes
      })
    }
  });

  const fetchCakes = async (d: Date) => {
    setDate(date);
    try {
      await updateArrayCakes({
        month: d.getMonth() + 1,
        year: d.getFullYear()
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>

      {cakes &&
        <Calendar
          date={date}
          setDate={setDate}
          fetchCakes={fetchCakes}
          cakes={cakes}
        />
      }

      <ScrollView
        style={{ flex: 1, width: "100%" }}
        showsVerticalScrollIndicator={false}
      >
        {cakes && cakes.map((cake) => {
          return new Date(cake.deliveryDate).toISOString().split('T')[0] === date.toISOString().split('T')[0] &&
            <CakeCard key={cake.id} cake={cake} />;
        })}
      </ScrollView>
    </Layout>
  )
}