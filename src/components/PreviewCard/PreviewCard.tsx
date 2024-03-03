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
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={[globalStyles.h3, styles.title]}>
            {title}
          </Text>
        </View>
        <View style={styles.body}>
          <Image style={styles.image} source={{ uri: image }} />
          <View style={styles.cardTextContainer}>
            <View style={styles.authorContainer}>
              <Image style={styles.authorImage} source={{ uri: authorImage }} />
              <Text
                numberOfLines={1}
                style={[globalStyles.body1, styles.author]}
              >
                {author}
              </Text>
            </View>
            <Text
              numberOfLines={3}
              style={[globalStyles.subtext, styles.storyDescription]}
            >
              {excerpt.html.slice(3, -3)}
            </Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text key={tags[0]} style={[globalStyles.button1]}>
                {tags[0]}
              </Text>
            </View>
          </View>
          <View style={styles.moreTags}>
            <Pressable>
              <Text style={[globalStyles.subtext, styles.moreTagsText]}>
                {' '}
                + {tags.length - 1} more tags
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default PreviewCard;
