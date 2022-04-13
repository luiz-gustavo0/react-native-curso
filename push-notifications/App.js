import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {
  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }

        return statusObj;
      })
      .then((statusObj) => {
        if (statusObj.status !== 'granted') {
          return;
        }
      });
  }, []);

  const handleTriggerNotification = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first notification',
        body: 'Notifiation 1',
      },
      trigger: {
        seconds: 10,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Button title='Push notification' onPress={handleTriggerNotification} />
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
