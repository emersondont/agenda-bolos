import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import filling from './src/services/Filling';
import { useState } from 'react';
import { FillingType } from './src/types';


export default function App() {
  const [fillings, setFillings] = useState<FillingType[]>([])

  const createFilling = async () => {
    await filling.create('chocolate')
      .then(filling => console.log(filling))
      .catch(error => console.log('Error creating filling: ' + error));

    await filling.all()
      .then(f => setFillings(f))
      .catch(error => console.log('Error getting fillings: ' + error));

    console.log(fillings)

  }


  return (
    <View style={styles.container}>
      {
        fillings.map((f) => {
          return (
            <View key={f.id}>
              <Text>{f.id}</Text>
              <Text>{f.name}</Text>
            </View>
          )
        })
      }
      <StatusBar style="auto" />
      <Button onPress={createFilling} title='clica' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
