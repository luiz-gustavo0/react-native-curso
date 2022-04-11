import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export const PlaceItem = ({ place, onSellect }) => {
  return (
    <Pressable onPress={onSellect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
