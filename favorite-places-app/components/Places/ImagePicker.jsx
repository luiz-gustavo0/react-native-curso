import { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { OutlinedButton } from '../OutlinedButton';

export const ImagePicker = ({ onImagePicker }) => {
  const [pickedImage, setPickedImage] = useState();
  const [infoCameraPermission, requestPermisssion] = useCameraPermissions();

  async function verifyPermissions() {
    if (infoCameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermisssion();
      return permissionResponse.granted;
    }

    if (infoCameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        'insuficient permissions',
        'You need to grant camera permissions to use this app'
      );
      return false;
    }

    return true;
  }

  async function handleTakeImage() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.uri);
    onImagePicker(image.uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {pickedImage ? (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <OutlinedButton icon='camera' onPress={handleTakeImage}>
        Take image
      </OutlinedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
