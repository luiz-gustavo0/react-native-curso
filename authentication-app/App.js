import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import IconButton from './components/IconButton';
import AuthContextProvider from './context/AuthContext';

import { useAuth } from './hooks/useAuth';
import { Colors } from './constants/styles';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name='Welcome'
        component={Welcome}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='exit'
              color={tintColor}
              size={24}
              onPress={logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated && <AuthStack />}
      {isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTrayingLogin, setIsTrayingLogin] = useState(true);
  const { authenticate } = useAuth();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('@token');
      if (storedToken) {
        authenticate(storedToken);
      }
      setIsTrayingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTrayingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthContextProvider></AuthContextProvider>
    </>
  );
}
