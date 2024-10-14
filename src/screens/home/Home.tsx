import {View, Text, Button, TouchableOpacity} from 'react-native';
import React from 'react';

const Home = ({navigation}: any) => {
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Todo')}
      ><Text>Goto Todo</Text></TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Form')}
      ><Text>Goto Form</Text></TouchableOpacity>
    </View>
  );
};

export default Home;
