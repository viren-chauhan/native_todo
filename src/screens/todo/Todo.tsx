import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import useTodos from '../../hooks/useTodos';
import ModalComponent from '../../components/Modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// axios.defaults.baseURL = 'http://localhost:8000';

// let editedTask: any = {
//   id: 0,
//   task: '',
//   completed: false,
// };

const Todo = () => {
  const [isAddModal, setIsAddModal] = useState<boolean>(false);
  const [searchedTask, setSearchedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({
    id: 0,
    task: '',
    completed: false,
  });
  const {data, createTodo, deleteTodo, editTodo}: any = useTodos();
  const [allTasks, setAllTasks] = useState<any>([]);

  React.useEffect(() => {
    // setAllTasks(getAll);
    console.log('Data--------------', data);
    setAllTasks(data);
  }, [data]);

  let todoId = data?.length - 1;
  let newId = data && data[todoId]?.id + 1;

  let newTask: any = {
    id: newId ? newId : 1,
    task: '',
    completed: false,
  };

  const setEditTask = (item: any) => {
    setEditedTask(item);
    setIsAddModal(true);
  };

  // const asyncData = async () => {
  //   let asyncTodo: any = AsyncStorage.getItem('todo');
  //   let json = JSON.parse(asyncTodo);
  //   console.log('json---------------', json);
  // };


  // useEffect(() => {
  //   asyncData();
  // }, []);

  const createTask = () => {
    console.log("New Task : ", newTask);
    createTodo(newTask);
    setIsAddModal(false);
  };

  const updateTask = () => {
    console.log('Updated Task!');
    editTodo(editedTask);
    setIsAddModal(false);
  };

  const removeTodo = (item: any) => {
    deleteTodo(item.id);
  };

  const onChange = (e: any) => {
    if (e) {
      let todos: any = allTasks.filter((i: any) =>
        i?.task.toLowerCase().includes(e),
      );
      setAllTasks(todos);
    } else {
      setAllTasks(data);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ebebeb',
      }}>
      <StatusBar backgroundColor={'#8257e5'} />
      <View
        style={{
          backgroundColor: '#8257e5',
          height: 120,
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25,
        }}>
        <Text style={{fontSize: 35, fontWeight: 'bold', color: '#ffffff'}}>
          to.do
        </Text>
        <TouchableOpacity
          onPress={() => {
            setEditedTask({id: 0, task: '', completed: false});
            setIsAddModal(true);
          }}>
          <FontAwesomeIcon icon={faCirclePlus} size={23} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, width: '100%'}}>
        <View
          style={{
            paddingHorizontal: 25,
            paddingVertical: 25,
            width: '100%',
            // backgroundColor: 'red',
          }}>
          <TextInput
            placeholder="Search Task!"
            style={{
              backgroundColor: '#ffffff',
              paddingHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 6,
            }}
            onChangeText={onChange}
          />
        </View>
        <View style={{flex: 1, width: '100%'}}>
          {data?.length === 0 && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: 'blue',
              }}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                Not todos added yet!
              </Text>
            </View>
          )}
          <FlatList
            data={allTasks ? allTasks : data}
            ItemSeparatorComponent={() => <View style={{height: 12}}></View>}
            renderItem={({item}) => (
              <View
                style={{
                  backgroundColor: '#d6d6d6',
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    flex: 1,
                    alignItems: 'center',
                  }}>
                  <BouncyCheckbox
                    fillColor="#8257e5"
                    isChecked={item.completed}
                    size={25}
                    unFillColor="#ffffff"
                    text={item.task}
                    iconStyle={{borderColor: 'black'}}
                    innerIconStyle={{borderWidth: 1, borderColor: '#9f9f9f'}}
                    textStyle={{color: 'black'}}
                    onPress={async isChecked => {
                      console.log('Demo');

                      setEditedTask({
                        id: item.id,
                        task: item.task,
                        completed: isChecked,
                      });
                      await updateTask;
                      console.log('editedTask======', editedTask);
                    }}
                  />
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    columnGap: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // setDataToEdit(item);
                      setEditTask(item);
                      // editTodo(task);
                    }}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size={22}
                      color="gray"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      removeTodo(item);
                    }}>
                    <FontAwesomeIcon icon={faTrashCan} size={22} color="gray" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
      {isAddModal && (
        <ModalComponent
          setIsAddModal={setIsAddModal}
          newTask={newTask}
          createTask={createTask}
          updateTask={updateTask}
          editedTask={editedTask}
          setEditedTask={setEditedTask}
        />
      )}
    </SafeAreaView>
  );
};

export default Todo;
