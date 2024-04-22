import * as cheerio from 'cheerio';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Emoji from 'react-native-emoji';

import styles from './styles';
import { fetchAllReactionsToStory } from '../../queries/reactions';
import { Reactions } from '../../queries/types';
import globalStyles from '../../styles/globalStyles';
import SaveStoryButton from '../SaveStoryButton/SaveStoryButton';
import ReactionDisplay from '../ReactionDisplay/ReactionDisplay';

const placeholderImage =
  'https://gwn-uploads.s3.amazonaws.com/wp-content/uploads/2021/10/10120952/Girls-Write-Now-logo-avatar.png';

type PreviewCardProps = {
  title: string;
  image: string;
  storyId: number;
  author: string;
  authorImage: string;
  defaultSavedStoriesState?: boolean;
  excerpt: { html: string };
  tags: string[];
  reactions?: string[] | null;
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
  defaultSavedStoriesState = false,
  pressFunction,
  reactions: preloadedReactions = null,
}: PreviewCardProps) {
  const [reactions, setReactions] = useState<string[] | null>(
    preloadedReactions,
  );
  useEffect(() => {
    if (preloadedReactions != null) {
      return;
    }

    (async () => {
      const temp = await fetchAllReactionsToStory(storyId);
      if (temp != null) {
        setReactions(temp.map(r => r.reaction));
        return;
      }
      setReactions([]);
    })();
  }, []);

  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={[globalStyles.h3, styles.title]}>
            {title}
          </Text>
          <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
            <View>
              <SaveStoryButton
                storyId={storyId}
                defaultState={defaultSavedStoriesState}
              />
            </View>
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
          <ReactionDisplay reactions={reactions ?? []} />
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
