import { ReactNode } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';

type UserStringInputProps = {
  placeholder: string;
  value: string | null;
  attributes?: TextInput['props'] | null;
  children?: ReactNode;
  label?: string;
  onChange?: (text: string) => any;
};

export default function UserStringInput({
  placeholder,
  value,
  attributes = {},
  label,
  children,
  onChange = _ => {},
}: UserStringInputProps) {
  return (
    <View style={styles.mt16}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.container, styles.verticallySpaced]}>
        <TextInput
          onChange={e => onChange(e.nativeEvent.text)}
          value={value ?? ''}
          style={styles.inputField}
          placeholder={placeholder}
          placeholderTextColor="#000"
          {...attributes}
        />
        {children}
      </View>
    </View>
  );
}
