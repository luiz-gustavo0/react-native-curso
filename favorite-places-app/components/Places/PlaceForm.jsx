import { useState, useCallback } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import { Button } from '../Button';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';

export const PlaceForm = ({ onCreatePlace }) => {
  const [title, setTitle] = useState();
  const [selectedImgae, setSelectedImgae] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function handleTakeImage(imageUri) {
    setSelectedImgae(imageUri);
  }

  const handlePickLocation = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function handleSavePlace() {
    const placeData = new Place(title, selectedImgae, pickedLocation);

    onCreatePlace(placeData);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>PlaceForm</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} />
      </View>
      <ImagePicker onImagePicker={handleTakeImage} />
      <LocationPicker onLocationPick={handlePickLocation} />
      <Button onPress={handleSavePlace}>Add Place</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
