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
  set: React.Dispatch<React.SetStateAction<string>>;
};

function UserStringInput({ label, value, set }: UserStringInputProps) {
  return (
    <View style={styles.verticallySpaced}>
      <Input
        label={label}
        value={value || ''}
        onChangeText={text => set(text)}
      />
    </View>
  );
}

export default UserStringInput;
