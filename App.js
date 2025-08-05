import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // 👈 新增

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import SearchScreen from './screens/SearchScreen';
import OneHymnScreen from './screens/OneHymnScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import PrivatePolicyScreen from './screens/PrivatePolicyScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const iconMap = {
  搜尋: 'search',
  播放清單: 'playlist-play',
  關於: 'info',
};

const commonOptions = {
  headerStyle: {
    backgroundColor: '#6200EE',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function TabScreens() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = iconMap[route.name] || 'help-outline';
          return (
            <MaterialIcons
              name={iconName}
              size={focused ? size + 2 : size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="搜尋" component={SearchScreen} options={commonOptions} />
      <Tab.Screen name="播放清單" component={PlaylistScreen} options={commonOptions} />
      <Tab.Screen name="關於" component={NotificationsScreen} options={commonOptions} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider> {/* 👈 包裹整個 App */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Tabs" component={TabScreens} options={{ headerShown: false }} />
          <Stack.Screen name="OneHymnScreen" component={OneHymnScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PrivatePolicyScreen" component={PrivatePolicyScreen} options={{ title: '隱私政策' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
