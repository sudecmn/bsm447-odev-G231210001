import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RateListScreen from '../screens/RateListScreen';
import RateDetailScreen from '../screens/RateDetailScreen';
import SavedScreen from '../screens/SavedScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Rates" component={RateListScreen} options={{ title: 'Kurlar' }} />
      <Tab.Screen name="Saved" component={SavedScreen} options={{ title: 'Kaydedilenler' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="RateDetail"
          component={RateDetailScreen}
          options={{ title: 'Kur Detayı', headerBackTitle: 'Geri' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}