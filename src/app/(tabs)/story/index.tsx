import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import FavoriteStoryButton from '../../../components/FavoriteStoryButton/FavoriteStoryButton';
import SaveStoryButton from '../../../components/SaveStoryButton/SaveStoryButton';
import ReactionPicker from '../../../components/ReactionPicker/ReactionPicker';
import BackButton from '../../../components/BackButton/BackButton';
import { fetchStory } from '../../../queries/stories';
import { Story } from '../../../queries/types';
import colors from '../../../styles/colors';
import globalStyles, { fonts } from '../../../styles/globalStyles';

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const scrollRef = React.useRef<any>(null);
  const [story, setStory] = useState<Story>({} as Story);

  const params = useLocalSearchParams<{ storyId: string }>();
  const { storyId } = params;

  const { width } = useWindowDimensions();

  const scrollUp = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0 });
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const storyResponse = await fetchStory(parseInt(storyId as string, 10));
      setStory(storyResponse[0]);
    })().then(() => {
      setLoading(false);
    });
  }, [storyId]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this story from Girls Write Now!!!\n${story.link}/`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={[globalStyles.tabBarContainer, styles.container]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          bounces
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          <BackButton pressFunction={() => router.back()} />

          <Text style={[globalStyles.h1, styles.title]}>{story?.title}</Text>

          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/author',
                params: { author: story.author_id.toString() },
              });
            }}
          >
            <View style={styles.author}>
              <Image
                style={styles.authorImage}
                source={{ uri: story.author_image ? story.author_image : '' }}
              />
              <Text
                style={[
                  globalStyles.subHeading1Bold,
                  { textDecorationLine: 'underline' },
                ]}
              >
                By {story.author_name}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <FlatList
              style={styles.genres}
              horizontal
              data={story.genre_medium}
              renderItem={({ item }) => (
                <View style={styles.genresBorder}>
                  <Text style={[globalStyles.button1, styles.genresText]}>
                    {item}
                  </Text>
                </View>
              )}
            />
            <View style={styles.options}>
              <SaveStoryButton storyId={parseInt(storyId as string, 10)} />
              <FavoriteStoryButton storyId={parseInt(storyId as string, 10)} />
              <Button
                textColor="black"
                buttonColor={colors.gwnOrange}
                icon="share"
                onPress={onShare}
                style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
              >
                <Text
                  style={[globalStyles.bodyUnderline, styles.shareButtonText]}
                >
                  Share Story
                </Text>
              </Button>
            </View>
          </View>

          <RenderHTML
            contentWidth={width}
            source={story.excerpt}
            baseStyle={{ ...globalStyles.body3, ...styles.excerpt }}
            systemFonts={fonts}
          />

          <RenderHTML
            contentWidth={width}
            source={story.content}
            baseStyle={{ ...globalStyles.body1, ...styles.story }}
            systemFonts={fonts}
          />

          <Button
            textColor="black"
            buttonColor={colors.gwnOrange}
            icon="share"
            onPress={onShare}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={[globalStyles.bodyUnderline, styles.shareButtonText]}>
              Share Story
            </Text>
          </Button>

          <Text style={[globalStyles.h3, styles.authorProcess]}>
            Author's Process
          </Text>

          <RenderHTML
            contentWidth={width}
            source={story.process}
            baseStyle={{ ...globalStyles.body1, ...styles.process }}
            systemFonts={fonts}
          />

          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: '/author',
                params: { author: story.author_id.toString() },
              });
            }}
          >
            <View style={styles.author}>
              <Image
                style={styles.authorImage}
                source={{ uri: story.author_image ? story.author_image : '' }}
              />
              <Text
                style={[
                  globalStyles.subHeading1Bold,
                  { textDecorationLine: 'underline' },
                ]}
              >
                By {story.author_name}
              </Text>
            </View>
          </TouchableOpacity>

          <Button
            textColor="black"
            icon="arrow-up"
            onPress={scrollUp}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={globalStyles.bodyBoldUnderline}>Back To Top</Text>
          </Button>
          <View style={styles.bottomReactionContainer}>
            <ReactionPicker storyId={parseInt(storyId as string, 10)} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
