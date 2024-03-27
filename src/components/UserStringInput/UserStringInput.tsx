import { ReactNode } from 'react';
import { View, Text, TextInput } from 'react-native';

import styles from './styles';
import colors from '../../styles/colors';
import globalStyles from '../../styles/globalStyles';

type UserStringInputProps = {
  placeholder: string;
  value: string | null;
  attributes?: TextInput['props'] | null;
  children?: ReactNode;
  label?: string;
  labelColor?: string;
  placeholderTextColor?: string;
  onChange?: (text: string) => any;
};

export default function UserStringInput({
  placeholder,
  value,
  attributes = {},
  label,
  children,
  labelColor = '#000',
  placeholderTextColor = colors.darkGrey,
  onChange = _ => {},
}: UserStringInputProps) {
  return (
    <View style={styles.mt16}>
      {label && (
        <Text style={{ ...globalStyles.subtext, color: labelColor }}>
          {label}
        </Text>
      )}
      <View style={[styles.container, styles.verticallySpaced]}>
        <TextInput
          onChange={e => onChange(e.nativeEvent.text)}
          value={value ?? ''}
          style={[styles.inputField, globalStyles.body1]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          {...attributes}
        />
        {children}
      </View>
    </View>
  );
}
