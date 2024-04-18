import * as cheerio from 'cheerio';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Emoji from 'react-native-emoji';
import { Image } from 'expo-image';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addUserStoryToReadingList,
  deleteUserStoryToReadingList,
  isStoryInReadingList,
} from '../../queries/savedStories';
import { useSession } from '../../utils/AuthContext';
import { useIsFocused } from '@react-navigation/native';
import { usePubSub } from '../../utils/PubSubContext';

const placeholderImage =
  'https://gwn-uploads.s3.amazonaws.com/wp-content/uploads/2021/10/10120952/Girls-Write-Now-logo-avatar.png';
const saveStoryImage = require('../../../assets/save_story.png');
const savedStoryImage = require('../../../assets/saved_story.png');

type PreviewCardProps = {
  title: string;
  image: string;
  storyId: number;
  author: string;
  authorImage: string;
  excerpt: { html: string };
  tags: string[];
  pressFunction: (event: GestureResponderEvent) => void;
};

function PreviewCard({
  title,
  image,
  storyId,
  author,
  authorImage,
  excerpt,
  tags,
  pressFunction,
}: PreviewCardProps) {
  const { user } = useSession();
  const isFocused = useIsFocused();
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
      setStoryIsSaved(channels[storyId])
    }
  }, [channels[storyId]]);


  useEffect(() => {
    isStoryInReadingList(storyId, user?.id).then(storyInReadingList =>
      setStoryIsSaved(storyInReadingList),
    );
  }, [storyId, isFocused]);

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
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={[globalStyles.h3, styles.title]}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => saveStory(!storyIsSaved)}>
            {storyIsSaved ?
              savedStoryImageComponent : saveStoryImageComponent
            }
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Image
            style={styles.image}
            source={{ uri: image === '' ? placeholderImage : image }}
          />
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
              "{cheerio.load(excerpt.html ?? '').text()}"
            </Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
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
          <View style={styles.tagsRow}>
            {(tags?.length ?? 0) > 0 && (
              <View style={styles.tag}>
                <Text key={tags[0]} style={globalStyles.button1}>
                  {tags[0]}
                </Text>
              </View>
            )}
            <Pressable style={styles.moreTags}>
              <Text style={[globalStyles.subtext, styles.moreTagsText]}>
                {' '}
                + {(tags?.length ?? 1) - 1}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default PreviewCard;
