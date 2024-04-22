import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';

import styles from './styles';
import { fetchAllReactionsToStory } from '../../queries/reactions';
import { Reactions } from '../../queries/types';
import globalStyles from '../../styles/globalStyles';
import SaveStoryButton from '../SaveStoryButton/SaveStoryButton';
import ReactionDisplay from '../ReactionDisplay/ReactionDisplay';

type ContentCardProps = {
  id: number;
  title: string;
  author: string;
  image: string;
  authorImage: string;
  storyId: number;
  pressFunction: (event: GestureResponderEvent) => void;
};

function ContentCard({
  id,
  title,
  author,
  image,
  authorImage,
  storyId,
  pressFunction,
}: ContentCardProps) {
  const [reactions, setReactions] = useState<string[]>();

  useEffect(() => {
    (async () => {
      const temp = await fetchAllReactionsToStory(id);
      if (temp != null) {
        setReactions(temp.map(r => r.reaction));
        return;
      }

      setReactions([]);
    })();
  }, []);

  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.contentCard}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.image} source={{ uri: image }} />
          <Image
            style={styles.authors}
            source={{
              uri: authorImage,
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[globalStyles.subHeading2, styles.title]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={styles.authorSpacing}>
            <Text style={styles.by} numberOfLines={1}>
              By
            </Text>
            <Text style={globalStyles.subtext} numberOfLines={1}>
              {author}
            </Text>
          </View>
          <View style={styles.buttons}>
            <ReactionDisplay reactions={reactions ?? []} />
            <TouchableOpacity>
              <SaveStoryButton storyId={storyId} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
