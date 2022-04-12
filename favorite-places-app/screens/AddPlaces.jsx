import React from 'react';
import { PlaceForm } from '../components/Places/PlaceForm';
import { insertPlace } from '../utils/database';

const AddPlaces = ({ navigation }) => {
  async function handleCreatePlace(place) {
    await insertPlace(place);
    navigation.navigate('AllPlaces');
  }

  return <PlaceForm onCreatePlace={handleCreatePlace} />;
};

export default AddPlaces;
