import {
  GestureResponderEvent,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';

import styles from './styles';
import {
  addUserStoryToReadingList,
  deleteUserStoryToReadingList,
  isStoryInReadingList,
} from '../../queries/savedStories';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import Emoji from 'react-native-emoji';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePubSub } from '../../utils/PubSubContext';

type ContentCardProps = {
  title: string;
  author: string;
  image: string;
  authorImage: string;
  storyId: number;
  pressFunction: (event: GestureResponderEvent) => void;
};

const saveStoryImage = require('../../../assets/save_story.png');
const savedStoryImage = require('../../../assets/saved_story.png');

function ContentCard({
  title,
  author,
  image,
  authorImage,
  storyId,
  pressFunction,
}: ContentCardProps) {
  const { user } = useSession();
  const [storyIsSaved, setStoryIsSaved] = useState(false);
  const { channels, initializeChannel, publish } = usePubSub();

  const savedStoryImageComponent = useMemo(() => {
    return (
      <Image
        style={{ width: 30, height: 30 }}
        source={savedStoryImage}
      />
    )
  }, [])
  const saveStoryImageComponent = useMemo(() => {
    return (
      <Image
        style={{ width: 30, height: 30 }}
        source={saveStoryImage}
      />
    )
  }, [])

  useEffect(() => {
    isStoryInReadingList(storyId, user?.id).then(storyInReadingList => {
      setStoryIsSaved(storyInReadingList)
      initializeChannel(storyId);
    });
  }, [storyId]);

  useEffect(() => {
    // if another card updates this story, update it here also
    if (typeof channels[storyId] !== "undefined") {
      setStoryIsSaved(channels[storyId]);
    }
  }, [channels[storyId]]);

  const saveStory = async (saved: boolean) => {
    setStoryIsSaved(saved);
    publish(storyId, saved);
    if (saved) {
      await addUserStoryToReadingList(user?.id, storyId);
    } else {
      await deleteUserStoryToReadingList(user?.id, storyId);
    }
  };

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
            <View style={{ flexDirection: 'row', gap: -7 }}>
              <View style={[styles.reactions, { backgroundColor: '#FFCCCB' }]}>
                <Emoji name="heart" />
              </View>
              <View style={[styles.reactions, { backgroundColor: '#FFD580' }]}>
                <Emoji name="clap" />
              </View>
              <View style={[styles.reactions, { backgroundColor: '#89CFF0' }]}>
                <Emoji name="muscle" />
              </View>
              {/* heart, clap, muscle, cry, ??? */}
              <View style={styles.reactionNumber}>
                <Text style={[globalStyles.subtext, styles.reactionText]}>
                  14{/*change number to work*/}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => saveStory(!storyIsSaved)}>
              {storyIsSaved ?
                savedStoryImageComponent : saveStoryImageComponent
              }
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
