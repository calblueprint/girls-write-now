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
import SaveStoryButton from '../SaveStoryButton/SaveStoryButton';

const placeholderImage =
  'https://gwn-uploads.s3.amazonaws.com/wp-content/uploads/2021/10/10120952/Girls-Write-Now-logo-avatar.png';

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
  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text numberOfLines={1} style={[globalStyles.h3, styles.title]}>
            {title}
          </Text>
          <TouchableOpacity>
            <SaveStoryButton storyId={storyId} />
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
