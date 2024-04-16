import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import { addUserStoryToReadingList, deleteUserStoryToReadingList, isStoryInReadingList } from '../../queries/savedStories';
import globalStyles from '../../styles/globalStyles';
import { useSession } from '../../utils/AuthContext';
import Emoji from 'react-native-emoji';
import { useEffect, useMemo, useState } from 'react';


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

  useEffect(() => {
    isStoryInReadingList(storyId, user?.id).then(storyInReadingList => setStoryIsSaved(storyInReadingList))
  }, [storyId])


  const saveStory = () => {
    if (storyIsSaved) {
      deleteUserStoryToReadingList(user?.id, storyId);
    } else {
      addUserStoryToReadingList(user?.id, storyId);
    }
    setStoryIsSaved(!storyIsSaved);
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
            <TouchableOpacity onPress={() => saveStory()}>
              <Image
                style={styles.saveStoryImage}
                source={storyIsSaved ? savedStoryImage : saveStoryImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
