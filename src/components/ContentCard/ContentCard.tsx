import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type ContentCardProps = {
  title: string;
  author: string;
  image: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function ContentCard({
  title,
  author,
  image,
  pressFunction,
}: ContentCardProps) {
  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.contentCard}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.textContainer}>
          <Text style={[globalStyles.h3, styles.title]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={globalStyles.body1} numberOfLines={1}>
            {author}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
