import { StyleSheet, View, Text, Pressable } from 'react-native';

export const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable onPress={() => onDelete(goal.key)}>
        <Text style={styles.goalText}>{goal.text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: '#fff',
    padding: 8,
  },
});
