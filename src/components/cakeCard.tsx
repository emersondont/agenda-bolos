import React from 'react';
import { Card, Text } from "@ui-kitten/components";
import { CakeType } from "../types";
import { View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

interface Props {
  cake: CakeType
  isLoading: boolean
}

export default function CakeCard(props: Props) {
  return (
    <Animated.View entering={FadeIn.duration(200).delay(props.isLoading ? 400 : 0)}>
      <Card style={{ marginBottom: 12 }} status='primary'>
        <Text category='h5'>{props.cake.customer}</Text>
        <View style={styles.view}>
          <Text style={styles.price} category='s1'>
            {props.cake.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </Text>
          <Text category='p2'>
            <Feather name="calendar" size={14} color='#666' />
            {new Date(props.cake.deliveryDate).toLocaleDateString()}
          </Text>
        </View>
      </Card>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6
  },
  price: {
    fontWeight: 'bold',
    color: '#28a745',
  },
});
