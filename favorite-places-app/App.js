import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';

import { Colors } from './constants/colors';

import IconButton from './components/IconButton';
import AddPlaces from './screens/AddPlaces';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import { init } from './utils/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialize, setDbInitialize] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialize(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialize) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 },
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your favorite places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  name='add'
                  size={24}
                  color={tintColor}
                  onPress={() => {
                    navigation.navigate('AddPlaces');
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name='AddPlaces'
            component={AddPlaces}
            options={{
              title: 'Add new place',
            }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
