import { View, Text } from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type AccountDataDisplayProps = {
  label: string;
  value: string | React.ReactNode;
};

/*
 * Used on the setting page. Displays information about the user's account.
 * For example label="First Name" value="John"
 */
function AccountDataDisplay({ label, value }: AccountDataDisplayProps) {
  return (
    <View style={styles.view}>
      <Text style={[globalStyles.subtext, styles.label]}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={[globalStyles.body1, styles.value]}>{value}</Text>
      ) : (
        value
      )}
    </View>
  );
}

export default AccountDataDisplay;
