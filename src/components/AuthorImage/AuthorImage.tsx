import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

type AuthorImageProps = {
  authorname: string;
  authorUri: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function AuthorImage({ pressFunction }: AuthorImageProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.authorImageContainer}>
        <Text>testing</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AuthorImage;
