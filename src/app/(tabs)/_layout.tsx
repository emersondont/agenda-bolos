import { Tabs } from 'expo-router'
import { MaterialIcons} from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TabRoutesLayout() {
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Home',
          tabBarIcon:({size, color}) => (
            <MaterialIcons name='home' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name='newCake'
        options={{
          title: 'Cake',
          tabBarIcon:({size, color}) => (
            <MaterialCommunityIcons name='cake' size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen 
        name='expenses'
        options={{
          title: 'Gastos',
          tabBarIcon:({size, color}) => (
            <FontAwesome5 name='hand-holding-usd' size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen 
        name='finances'
        options={{
          title: 'Finanças',
          tabBarIcon:({size, color}) => (
            <MaterialCommunityIcons name='finance' size={size} color={color} />
          )
        }}
      />

    </Tabs>
  )
}