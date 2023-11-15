import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import globalStyles from '../styles/globalStyles';

type UserStringInputProps = {
  placeholder: string;
  value: string | null;
  attributes?: TextInput['props'] | null;
  children?: ReactNode;
  onChange?: (text: string) => any;
};

export default function UserStringInput({
  placeholder,
  value,
  attributes = {},
  children,
  onChange = text => {},
}: UserStringInputProps) {
  return (
    <View style={[styles.verticallySpaced, globalStyles.mt20]}>
      <TextInput
        onChangeText={text => onChange(text)}
        value={value ?? ''}
        style={styles.inputField}
        placeholder={placeholder}
        placeholderTextColor="#000"
        {...attributes}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    fontSize: 14,
    fontFamily: 'Manrope',
    alignItems: 'center',
    padding: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: 'gray',
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});
