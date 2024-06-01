import React from 'react';
import { Card, Text } from "@ui-kitten/components";
import { CakeType } from "../types";
import { View, StyleSheet} from "react-native";

interface Props {
  cake: CakeType
}

export default function CakeCard({ cake }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.view}>
        <Text style={styles.customer}>{cake.customer}</Text>
        <Text style={styles.date}>{cake.deliveryDate.toLocaleDateString()}</Text>
      </View>
      <Text style={styles.price}>R$ {cake.price.toFixed(2)}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 6,
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  customer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#555'
  },
  date: {
    fontSize: 14,
    color: '#666'
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#28a745',
  }
});
