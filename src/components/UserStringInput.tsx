import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
});

type UserStringInputProps = {
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function UserStringInput({
  label,
  value,
  onChange,
}: UserStringInputProps) {
  return (
    <View style={styles.verticallySpaced}>
      <Input
        label={label}
        value={value || ''}
        onChangeText={text => onChange(text)}
      />
    </View>
  );
}
