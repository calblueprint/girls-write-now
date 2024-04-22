import { router } from 'expo-router';
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import styles from './styles';

type AuthorImageProps = {
  author_name: string;
  author_id: string;
  author_Uri: string;
  //   pressFunction: (event: GestureResponderEvent) => void;
};

function AuthorImage({
  author_name,
  author_id,
  author_Uri, //   pressFunction,
}: AuthorImageProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/author',
          params: { author: author_id },
        });
      }}
    >
      <View style={styles.author_container}>
        <Text style={styles.author_text}>Authors:</Text>
        <View style={styles.author}>
          <Image
            style={styles.author_image}
            source={{ uri: author_Uri ? author_Uri : '' }}
          />
          <Text style={styles.authorText}>{author_name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default AuthorImage;
