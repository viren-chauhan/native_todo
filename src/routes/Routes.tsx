import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home/Home';
import Todo from '../screens/todo/Todo';
import ReactHookForm from '../screens/home/ReactHookForm';
const Stack = createNativeStackNavigator();

const Routes = () => {
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
          name="Form"
          component={ReactHookForm}
          options={{
            headerShown: false,
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
