import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
