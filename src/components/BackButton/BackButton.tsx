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

/*
 * Universal pre styled back button
 * pressFunction will usually be `router.back()`
 */
function BackButton({ pressFunction }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.backButton}>
        <Text style={[globalStyles.button1, styles.text]}>&lt;Back</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BackButton;
