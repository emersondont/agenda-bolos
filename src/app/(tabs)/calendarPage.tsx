import Calendar from "../../components/calendar";
import Layout from "../../components/layout";
import { useEffect, useState } from "react";
import { CakeType } from "../../types";
import { useCakeDatabase } from "../../database/useCakeDatabase";
import { ScrollView } from "react-native";
import CakeCard from "../../components/cakeCard";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [cakes, setCakes] = useState<CakeType[]>([]);
  const cakeDatabase = useCakeDatabase()

  const fetchCakes = async (date: Date) => {
    setDate(date);
    try {
      const res = await cakeDatabase.getByMonth(date.getMonth() + 1, date.getFullYear());
      setCakes(res)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCakes(date);
  }, []);

  return (
    <Layout>
      <Calendar
        date={date}
        setDate={setDate}
        fetchCakes={fetchCakes}
        cakes={cakes}
      />

      <ScrollView
        style={{ flex: 1, width: "100%"}}
        showsVerticalScrollIndicator={false}
      >
        {cakes.map((cake) => 
          String(cake.deliveryDate).split('T')[0] === date.toISOString().split('T')[0] &&
            <CakeCard key={cake.id} cake={cake} />
        )}
      </ScrollView>
    </Layout>
  )
}