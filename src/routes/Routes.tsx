import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Todo from '../screens/todo/Todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTodos from '../hooks/useTodos';
const Stack = createNativeStackNavigator();

const Routes = () => {
  const {setTodo}: any = useTodos();
  const asyncData = async () => {
    let asyncTodo: any = await AsyncStorage.getItem('todo');
    let json = JSON.parse(asyncTodo);
    setTodo(json);
    console.log('json---------------', json);
  };
  React.useEffect(() => {
    asyncData();
    // AsyncStorage.clear();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitleAlign: 'center',
            headerRight: () => (
              <Button
                title="Alert"
                onPress={() => Alert.alert('Hello World!')}
              />
            ),
            headerTitleStyle: {color: 'green', fontWeight: 'condensedBold'},
            headerStyle: {backgroundColor: 'lightblue'},
          }}
        />
        <Stack.Screen
          name="Todo"
          component={Todo}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
