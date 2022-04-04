import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from 'react-native';
import { GoalInput } from './components/GoalInput';
import { GoalItem } from './components/GoalItem';

export default function App() {
  const [modalIsVisisble, setModalIsVisisble] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleAddGoals(goalText) {
    setGoals((prevState) => [
      { text: goalText, key: Math.random().toString() },
      ...prevState,
    ]);
    setModalIsVisisble(false);
  }

  function handleDeleteItem(key) {
    setGoals((prevState) => {
      return prevState.filter((item) => item.key !== key);
    });
  }

  function handleCancel() {
    setModalIsVisisble(false);
  }

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View>
          <Button
            title='Add new goal'
            color='#5e0acc'
            onPress={() => setModalIsVisisble(true)}
          />
        </View>
        <GoalInput
          onAddGoal={handleAddGoals}
          visible={modalIsVisisble}
          onCancel={handleCancel}
        />
        <View style={styles.goalsContianer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem goal={itemData.item} onDelete={handleDeleteItem} />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 16,
  },

  goalsContianer: {
    flex: 6,
  },
});
