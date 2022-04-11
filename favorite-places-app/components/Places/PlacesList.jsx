import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { PlaceItem } from './PlaceItem';

export const PlacesList = ({ places }) => {
  if (!places || places.lenght === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
    />
  );
};

const styles = StyleSheet.create({
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
