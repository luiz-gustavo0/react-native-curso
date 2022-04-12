import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { PlaceItem } from './PlaceItem';

export const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  function handleSelectPlace(id) {
    navigation.navigate('PlaceDetails', {
      placeId: id,
    });
  }

  if (!places || places.lenght === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSellect={handleSelectPlace} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
