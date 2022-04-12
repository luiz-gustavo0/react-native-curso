import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from 'expo-location';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import { OutlinedButton } from '../OutlinedButton';

import { Colors } from '../../constants/colors';
import { getAddress, getMapPreview } from '../../utils/location';

export const LocationPicker = ({ onLocationPick }) => {
  const [location, setLocation] = useState();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionResponse, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.latitude,
        lng: route.params.longitude,
      };
      setLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = await getAddress(location.lat, location.lng);
        onLocationPick({ ...location, address });
      }
    }

    handleLocation();
  }, [location, onLocationPick]);

  async function verifyPermisssions() {
    if (locationPermissionResponse.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionResponse.status === PermissionStatus.DENIED) {
      Alert.alert(
        'insuficient permissions',
        'You need to grant location permissions to use this app'
      );
      return false;
    }

    return true;
  }

  async function handleGetLocation() {
    const hasPermission = await verifyPermisssions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function handlePickOnMap() {
    navigation.navigate('Map');
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {location ? (
          <Image
            style={styles.image}
            source={{ uri: getMapPreview(location.lat, location.lng) }}
          />
        ) : (
          <Text>No image preview</Text>
        )}
      </View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={handleGetLocation}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon='map' onPress={handlePickOnMap}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
