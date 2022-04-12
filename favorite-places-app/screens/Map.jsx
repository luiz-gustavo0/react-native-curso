import { useLayoutEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconButton from '../components/IconButton';

const Map = ({ navigation, route }) => {
  const initialLocation =
    {
      lat: route.params.initialLat,
      lng: route.params.initialLng,
    } ?? null;

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.45,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function handleSelectLocation(event) {
    if (initialLocation) {
      return;
    }
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  const handleSavePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert('No location picked!', 'You have to pick a location');
      return;
    }

    navigation.navigate('AddPlaces', {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }

    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name='save'
          size={24}
          color={tintColor}
          onPress={handleSavePickedLocation}
        />
      ),
    });
  }, [navigation, handleSavePickedLocation, initialLocation]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={handleSelectLocation}
    >
      {selectedLocation && (
        <Marker
          title='Picked Location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
