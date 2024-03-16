import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type BackButtonProps = {
  pressFunction: (event: GestureResponderEvent) => void;
};

function AuthBackButton({ pressFunction }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.authBackButton}>
        <Text style={[globalStyles.button1, styles.text]}>&lt; Back</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AuthBackButton;
