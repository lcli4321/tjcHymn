import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import OneHymnScreen from './screens/OneHymnScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 把 Tab 畫面定義成一個 component
function TabScreens() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="搜尋" component={HomeScreen} />
      <Tab.Screen name="播放清單" component={PlaylistScreen} />
      <Tab.Screen name="關於" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

// 在 Stack 裡包住 Tab，再額外放上 OneHymnScreen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={TabScreens} options={{ headerShown: false }} />
        <Stack.Screen name="OneHymnScreen" component={OneHymnScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
