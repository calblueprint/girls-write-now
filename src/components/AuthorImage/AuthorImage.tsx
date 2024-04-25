import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type AuthorImageProps = {
  author_name: string;
  author_id: string;
  author_Uri: string;
  //   pressFunction: (event: GestureResponderEvent) => void;
};

/*
 * Displays the author's profile picture in a circle with the text "Authors:" before it, followed by the author's name
 * Used exclusively on the story screen
 */
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
        <Text style={globalStyles.body1Bold}>Authors:</Text>
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
