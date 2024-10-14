import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';
import {useFormInputControllerStyle} from './FormInputController';

export interface FormInputControllersProps {
  onBlur: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
  props?: TextInputProps;
}

const FormInputControllers = ({
  placeholder,
  value,
  onBlur,
  onChange,
  props,
}: FormInputControllersProps) => {
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const {styles} = useFormInputControllerStyle({isFocus});
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onBlur={() => {
        setIsFocus(false);
        onBlur();
      }}
      onFocus={e => {
        setIsFocus(true);
      }}
      onChangeText={onChange}
      style={[styles.input]}
      {...props}
    />
  );
};

export default FormInputControllers;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 6,
    // backgroundColor:
  },
});
