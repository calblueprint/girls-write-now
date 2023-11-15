import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type PreviewCardProps = {
  title: string;
  image: string;
  author: string;
  authorImage: string;
  excerpt: { html: string };
  tags: string[];
  pressFunction: (event: GestureResponderEvent) => void;
};

function PreviewCard({
  title,
  image,
  author,
  authorImage,
  excerpt,
  tags,
  pressFunction,
}: PreviewCardProps) {
  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.card}>
        <View style={styles.top}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.cardTextContainer}>
            <Text numberOfLines={1} style={[globalStyles.h4, styles.title]}>
              {title}
            </Text>
            <View style={styles.authorContainer}>
              <Image style={styles.authorImage} source={{ uri: authorImage }} />
              <Text
                numberOfLines={1}
                style={[globalStyles.body2, styles.author]}
              >
                {author}
              </Text>
            </View>
            <Text numberOfLines={2} style={[globalStyles.body3]}>
              {excerpt.html.slice(3, -3)}
            </Text>
          </View>
        </View>
        {/* <View style={styles.bottom}>
          <View style={styles.tagsContainer}>
            {tags.map(tag => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
          <View style={styles.moreTags}>
            <Pressable>
              <Text>more tags</Text>
            </Pressable>
          </View>
        </View> */}
      </View>
    </Pressable>
  );
}

export default PreviewCard;
