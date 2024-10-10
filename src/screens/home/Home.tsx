import {View, Text, Button} from 'react-native';
import React from 'react';

const Home = ({navigation}: any) => {
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home</Text>
      <Button
        title="Go to Todo"
        onPress={() => navigation.navigate('Todo')}
      />
    </View>
  );
};

export default Home;
