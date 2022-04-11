import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OutlinedButton } from '../OutlinedButton';

import { Colors } from '../../constants/colors';

export const LocationPicker = () => {
  function handleGetLocation() {}

  function handlePickOnMap() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
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
});
