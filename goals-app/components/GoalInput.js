import { useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Modal,
  Image,
} from 'react-native';

export const GoalInput = ({ onAddGoal, visible, onCancel }) => {
  const [goalText, setGoalText] = useState('');

  function handleChange(enteredText) {
    setGoalText(enteredText);
  }

  function handleAddGoal() {
    onAddGoal(goalText);
    setGoalText('');
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Your course goal'
          onChangeText={handleChange}
          value={goalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title='Add goal' onPress={handleAddGoal} />
          </View>
          <View style={styles.button}>
            <Button title='Cancel' onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
    width: '40%',
    marginHorizontal: 8,
  },
});
