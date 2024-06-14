import React from 'react';
import { Card, Text, Button } from "@ui-kitten/components";
import { CakeType } from "../types";
import { View, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import CakeModal from './modal/cakeModal';

interface Props {
  cake: CakeType
}

export default function CakeCard({ cake }: Props) {
  const [visible, setVisible] = React.useState(false);

  return (
    <Animated.View entering={FadeIn.duration(200)}>
      <Card
        style={{ marginBottom: 12 }}
        status='primary'
        onPress={() => setVisible(true)}
      >
        <Text category='h5'>{cake.customer}</Text>
        <View style={styles.view}>
          <Text style={styles.price} category='s1'>
            {cake.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
          </Text>
          <Text category='p2'>
            <Feather name="calendar" size={14} color='#666' />
            {new Date(cake.deliveryDate).toLocaleDateString()}
          </Text>
        </View>
      </Card>
      {
        visible && (
          <CakeModal
            cake={cake}
            visible={visible}
            setVisible={setVisible}
          />
        )
      }
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
