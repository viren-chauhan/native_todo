import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormInputController from '../../components/FormInputControllers';

const formSchema = yup.object({
  firstname: yup
    .string()
    .required('Firstname is required!')
    .min(2, 'Firstname must have atleast 2 character!'),
  lastname: yup.string().required('Lastname is required!'),
  username: yup.string().required('Lastname is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .min(5, 'Password is must be have atleast 5 character!'),
});

const ReactHookForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({resolver: yupResolver(formSchema)});

  const submit = (data: any) => {
    console.log('Form Data ----------', data);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:30}}>React Hook Form</Text>
      <Controller
        control={control}
        name="firstname"
        render={({field: {onChange, onBlur, value}}) => (
          <FormInputController
            placeholder="Enter First Name"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.firstname && (
        <Text style={styles.error}>{errors.firstname.message}</Text>
      )}
      <Controller
        control={control}
        name="lastname"
        render={({field: {onChange, onBlur, value}}) => (
          <FormInputController
            placeholder="Enter Lastname"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.lastname && (
        <Text style={styles.error}>{errors.lastname.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <FormInputController
            placeholder="Enter Password"
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            props={{secureTextEntry: true}}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name="username"
        render={({field: {onChange, onBlur, value}}) => (
          <FormInputController
            value={value}
            placeholder={'UserName'}
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
      )}
      <TouchableOpacity
        onPress={handleSubmit(submit)}
        style={{
          backgroundColor: 'lightblue',
          width: '90%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 15,
          marginVertical: 30,
        }}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReactHookForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: {
    color: 'red',
    // marginBottom: 10,
  },
});

// import React from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import * as Yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';

// // Define the validation schema
// const schema = Yup.object().shape({
//   name: Yup.string().required('Name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
// });

// const ReactHookForm = () => {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <View style={styles.container}>
//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder="Name"
//           />
//         )}
//         name="name"
//         rules={{ required: true }}
//       />
//       {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

//       <Controller
//         control={control}
//         render={({ field: { onChange, onBlur, value } }) => (
//           <TextInput
//             style={styles.input}
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             placeholder="Email"
//             keyboardType="email-address"
//           />
//         )}
//         name="email"
//         rules={{ required: true }}
//       />
//       {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

//       <Button title="Submit" onPress={handleSubmit(onSubmit)} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default ReactHookForm;
