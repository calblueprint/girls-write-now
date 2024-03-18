import {
  GestureResponderEvent,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type GenreStoryPreviewCardProps = {
  topic: string[];
  tone: string[];
  genreMedium: string[];
  allTags: string[];
  authorName: string;
  storyImage: string;
  authorImage: string;
  storyTitle: string;
  excerpt: { html: string };
  pressFunction: (event: GestureResponderEvent) => void;
};

function GenreStoryPreviewCard({
  topic,
  tone,
  genreMedium,
  allTags,
  authorName,
  storyImage,
  authorImage,
  storyTitle,
  excerpt,
  pressFunction,
}: GenreStoryPreviewCardProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.cardTextContainer}>
            <Text numberOfLines={1} style={[globalStyles.h3, styles.title]}>
              {storyTitle}
            </Text>
            <View style={styles.horizontalLine} />
            <View style={styles.cardContainer2}>
              <Image style={styles.image} source={{ uri: storyImage }} />
              <View style={styles.authorandText}>
                <View style={styles.authorContainer}>
                  <Image
                    style={styles.authorImage}
                    source={{ uri: authorImage }}
                  />
                  <Text
                    numberOfLines={1}
                    style={[globalStyles.body2, styles.author]}
                  >
                    {authorName}
                  </Text>
                </View>
                <Text numberOfLines={3} style={[styles.subtext]}>
                  {excerpt.html.slice(3, -3)}
                </Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.tagParent}>
              <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                  <Text>{genreMedium[0]}</Text>
                </View>
                <View style={styles.tags}>
                  <Text>{genreMedium[1]}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.tagSubtext}>
                  + {allTags.length} more{' '}
                  {allTags.length === 1 ? 'tag' : 'tags'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default GenreStoryPreviewCard;
