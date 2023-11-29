import { View, Text } from 'react-native';
import styles from './styles';

type AccountDataDisplayProps = {
  label: string;
  value: string | React.ReactNode;
};

function AccountDataDisplay({ label, value }: AccountDataDisplayProps) {
  return (
    <View style={styles.view}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={styles.value}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

export default AccountDataDisplay;
