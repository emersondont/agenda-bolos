import { StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from "react-native";
import { CakeType } from "../../types";
import CakeCard from "../../components/cakeCard";
import { ApplicationProvider, } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import Calendar from "../../components/calendar";
// import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from "react-native-reanimated";

const cakes: CakeType[] = [
  {
    id: '1',
    customer: 'Customer 1',
    price: 50,
    deliveryDate: new Date(),
    deliveryHour: 'morning',
    fillings: 'filling 1;filling 2',
    batter: 'batter 1',
    quantityFillings: 2,
    quantityBatters: 1,
    description: 'Cake 1 description',
  },
  {
    id: '2',
    customer: 'Customer 2',
    price: 75,
    deliveryDate: new Date(),
    deliveryHour: 'afternoon',
    fillings: 'filling 2;filling 3',
    batter: 'batter 2',
    quantityFillings: 3,
    quantityBatters: 2,
    description: 'Cake 2 description',
  },
  {
    id: '3',
    customer: 'Customer 3',
    price: 100,
    deliveryDate: new Date('2024-06-03'),
    deliveryHour: 'night',
    fillings: 'filling 1;filling 3',
    batter: 'batter 3',
    quantityFillings: 1,
    quantityBatters: 3,
    description: 'Cake 3 description',
  },
  {
    id: '4',
    customer: 'Customer 4',
    price: 125,
    deliveryDate: new Date(),
    deliveryHour: 'morning',
    fillings: 'filling 2;filling 3',
    batter: 'batter 1',
    quantityFillings: 2,
    quantityBatters: 1,
    description: 'Cake 4 description',
  },
  {
    id: '5',
    customer: 'Customer 5',
    price: 150,
    deliveryDate: new Date(),
    deliveryHour: 'afternoon',
    fillings: 'filling 1;filling 2',
    batter: 'batter 2',
    quantityFillings: 3,
    quantityBatters: 2,
    description: 'Cake 5 description',
  },
  {
    id: '6',
    customer: 'Customer 6',
    price: 175,
    deliveryDate: new Date(),
    deliveryHour: 'night',
    fillings: 'filling 2;filling 3',
    batter: 'batter 3',
    quantityFillings: 1,
    quantityBatters: 3,
    description: 'Cake 6 description',
  },
  {
    id: '7',
    customer: 'Customer 7',
    price: 200,
    deliveryDate: new Date(),
    deliveryHour: 'morning',
    fillings: 'filling 1;filling 2',
    batter: 'batter 1',
    quantityFillings: 2,
    quantityBatters: 1,
    description: 'Cake 7 description',
  },
  {
    id: '8',
    customer: 'Customer 8',
    price: 225,
    deliveryDate: new Date(),
    deliveryHour: 'afternoon',
    fillings: 'filling 2;filling 3',
    batter: 'batter 2',
    quantityFillings: 3,
    quantityBatters: 2,
    description: 'Cake 8 description',
  },
];

export default function Home() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>

        {
          showCalendar && (
            <Calendar
              date={date}
              setDate={setDate}
            />
          )
        }

        <Text style={styles.title}>Próximos bolos:</Text>

        <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
          {cakes.map((cake) =>
            showCalendar ?
              cake.deliveryDate.toDateString() === date.toDateString() ?
                <CakeCard key={cake.id} cake={cake} /> : null
              :
              (
                <CakeCard key={cake.id} cake={cake} />
              ))}
        </ScrollView>

        <Pressable
          style={styles.button}
          onPress={() => setShowCalendar(!showCalendar)}
        >
          <Feather name="calendar" size={32} color={'#fff'} />
        </Pressable>

      </View>
    </ApplicationProvider>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
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
