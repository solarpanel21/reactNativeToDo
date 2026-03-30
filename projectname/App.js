import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { CheckBox, Input, Button } from '@rneui/themed';

export default function App() {
  const [tasks, setTasks] = useState([
    { 
      key: '1', 
      description: 'Buy groceries',
      completed: false
    },
    { 
      key: '2', 
      description: 'Finish homework',
      completed: true
    },
    { 
      key: '3', 
      description: 'Call mom',
      completed: false
    },
    { 
      key: '4', 
      description: 'Walk the dog',
      completed: false
    },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (key) => {
    setTasks(tasks.map(task => 
      task.key === key 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const addTask = () => {
    if (newTask.trim() === '') return;
    
    const newTaskItem = {
      key: Date.now().toString(),
      description: newTask,
      completed: false
    };
    
    setTasks([...tasks, newTaskItem]);
    setNewTask('');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
          containerStyle={styles.checkbox}
        />
        <Text 
          style={[
            styles.taskText,
            item.completed && styles.completedTask
          ]}
        >
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todo List</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          containerStyle={styles.input}
        />
        <Button 
          title="Add" 
          onPress={addTask}
          buttonStyle={styles.addButton}
        />
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.list}
      />
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
  },
  addButton: {
    paddingHorizontal: 30,
    backgroundColor: '#2089dc',
  },
  list: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888',
  },
});
