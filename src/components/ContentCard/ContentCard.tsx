import { Image } from 'expo-image';
import React, { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import { fetchAllReactionsToStory } from '../../queries/reactions';
import globalStyles from '../../styles/globalStyles';
import ReactionDisplay from '../ReactionDisplay/ReactionDisplay';
import SaveStoryButton from '../SaveStoryButton/SaveStoryButton';

type ContentCardProps = {
  id: number;
  title: string;
  author: string;
  image: string;
  authorImage: string;
  storyId: number;
  pressFunction: (event: GestureResponderEvent) => void;
};

/*
 * Displays a story for use in horizontal ScrollView
 * Includes options to save the story, and see the reactions to a story
 * Uses the PubSubContext to update its icons based on user interaction
 */
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
        setReactions(temp);
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
            <ReactionDisplay storyId={storyId} reactions={reactions ?? []} />
            <TouchableOpacity style={{ marginTop: 'auto' }}>
              <SaveStoryButton storyId={storyId} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
