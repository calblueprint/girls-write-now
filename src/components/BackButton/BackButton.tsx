import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

type BackButtonProps = {
  pressFunction: (event: GestureResponderEvent) => void;
};

function BackButton({ pressFunction }: BackButtonProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.backButton}>
        <Text style={styles.text}>&lt; Back</Text>
      </View>
    </TouchableOpacity>
  );
}

export default BackButton;
