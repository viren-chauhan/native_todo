import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

const ModalComponent = ({
  setIsAddModal,
  newTask,
  createTask,
  updateTask,
  editedTask,
  setEditedTask,
}:
any) => {
  const [textFocus, setTextFocus] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

  const focusEvent = () => {
    if (!inputRef) return;
    setTextFocus(true);
    console.log('Focus called!');

    inputRef.current.focus();
  };

  // console.log('editedTaskModel', editedTask);

  const blurEvent = (e = null) => {
    console.log('>>> CALLED');
    if (inputRef.current) {
      setTextFocus(false);
      inputRef.current.blur(e);
    }
  };

  return (
    <Modal animationType="fade" visible={true} transparent={true}>
      <View
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        //   onTouchStart={() => Keyboard.dismiss()}
      >
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 20,
            width: '80%',
            padding: 25,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            rowGap: 20,
          }}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold'}}>
            {editedTask.task ? 'Update' : 'Add new'} todo
          </Text>
          <TextInput
            defaultValue={editedTask?.task}
            placeholder="Enter Todo"
            onChangeText={e => {
              editedTask?.task
                ? setEditedTask({
                    id: editedTask.id,
                    task: e,
                    completed: editedTask.completed,
                  })
                : (newTask.task = e);
              // console.log('dataToEdit.task------', dataToEdit.task);
            }}
            style={{
              // fontWeight: 'bold',
              width: '100%',
              borderRadius: 5,
              borderBottomColor: !textFocus ? 'black' : '#4285f4',
              borderBottomWidth: 1,
            }}
            //   disableFullscreenUI={false}
            //   onSubmitEditing={() => Keyboard.dismiss()}
            //   onFocus={() => setTextFocus(true)}
            onFocus={focusEvent}
            // onBlur={(e) => blurEvent(e)}
            onBlur={() => Keyboard.dismiss()}
            ref={inputRef}
          />
          <View
            style={{
              // backgroundColor: 'red',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              columnGap: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                setEditedTask({id: 0, task: '', completed: false});
                setIsAddModal(false);
              }}
              style={{
                //   backgroundColor: 'lightblue',
                padding: 10,
                width: '30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: '#4285f4', fontWeight: 'bold'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                editedTask?.task ? updateTask() : createTask();
              }}
              style={{
                backgroundColor: '#4285f4',
                padding: 10,
                width: '30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}>
              <Text style={{color: '#ffffff', fontWeight: 'bold'}}>
                {editedTask.task ? 'Edit' : 'Add'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
