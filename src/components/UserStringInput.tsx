import { ReactNode } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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
    <View
      style={[styles.container, styles.verticallySpaced, globalStyles.mt20]}
    >
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
  },
  inputField: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Manrope',
    padding: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: 'gray',
  },
  verticallySpaced: {
    alignSelf: 'stretch',
  },
});
