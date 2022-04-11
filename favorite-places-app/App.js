import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import IconButton from './components/IconButton';
import { Colors } from './constants/colors';

import AddPlaces from './screens/AddPlaces';
import AllPlaces from './screens/AllPlaces';

const Stack = createNativeStackNavigator();

export default function App() {
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
