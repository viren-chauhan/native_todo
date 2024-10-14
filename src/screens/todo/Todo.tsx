import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPenToSquare, faTrashCan} from '@fortawesome/free-regular-svg-icons';
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import useTodos from '../../hooks/useTodos';
import ModalComponent from '../../components/Modal';
import axios from 'axios';
axios.defaults.baseURL = 'http://10.0.2.2:3000/';

const Todo = () => {
  const [isAddModal, setIsAddModal] = useState<boolean>(false);
  const [searchedTask, setSearchedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({
    id: 0,
    task: '',
    completed: false,
  });
  const [newTask, setNewTask] = useState({
    task: '',
    completed: false,
  });
  const [allTasks, setAllTasks] = useState<any>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  const setEditTask = (item: any) => {
    setEditedTask(item);
    setIsAddModal(true);
  };

  const createTask = async () => {
    let data = await axios.post('todos', {
      task: newTask?.task,
      completed: newTask.completed,
    });
    if (data) {
      console.log('New Task Added!');
      callData();
    }
    setIsAddModal(false);
  };

  const updateTask = async () => {
    setLoading(true);
    let data: any = await axios.put(
      `todos/${editedTask?.id}`,
      {
        task: editedTask.task,
        completed: editedTask.completed,
      },
    );

    if (data) {
      console.log('Updated Task!');
      callData();
    }
    setIsAddModal(false);
  };

  const removeTodo = async (item: any) => {
    let data: any = await axios.delete(
      `todos/${item?.id}`,
    );
    if (data) {
      console.log('Deleted!');
      callData();
    }
  };

  const onChange = (e: any) => {
    if (e) {
      let todos: any = allTasks.filter((i: any) =>
        i?.task.toLowerCase().includes(e),
      );
      setAllTasks(todos);
    } else {
    }
  };

  let callData = async () => {
    setLoading(true);
    let data: any = await axios
      .get('todos')
      .then(resp => {
        console.log(resp.data);
        setAllTasks(resp.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error!---', err);
        setLoading(false);
      });

    if (data) {
      console.log('Data arrived');
    }
  };

  useEffect(() => {
    callData();
  }, []);
  useEffect(() => {
    console.log('All Tasks:-------', allTasks);
  }, [allTasks]);

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
          {/* Not todos added yet! For Redux */}
          {/* {data.length === 0 && (
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
        )} */}

          <FlatList
            data={allTasks || []}
            ListEmptyComponent={() =>
              isLoading ? (
                <View>
                  <ActivityIndicator size={'large'} color={'#8257e5'} />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    Not todos added yet!
                  </Text>
                </View>
              )
            }
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
          setNewTask={setNewTask}
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
