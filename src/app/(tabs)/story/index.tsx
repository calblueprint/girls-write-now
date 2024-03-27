import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { fetchStory } from '../../../queries/stories';
import { Story } from '../../../queries/types';

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
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          bounces
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{story?.title}</Text>
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
              <Text style={styles.authorText}>By {story.author_name}</Text>
            </View>
          </TouchableOpacity>

          <View>
            <FlatList
              style={styles.genres}
              horizontal
              data={story.genre_medium}
              renderItem={({ item }) => (
                <View style={styles.genresBorder}>
                  <Text style={styles.genresText}>{item}</Text>
                </View>
              )}
            />

            <Button
              textColor="black"
              buttonColor="#D9D9D9"
              icon="share"
              onPress={onShare}
              style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
            >
              <Text style={styles.shareButtonText}>Share Story</Text>
            </Button>
          </View>

          <RenderHTML
            contentWidth={width}
            source={story.excerpt}
            baseStyle={styles.excerpt}
          />

          <RenderHTML
            contentWidth={width}
            source={story.content}
            baseStyle={styles.story}
          />

          <Button
            textColor="black"
            buttonColor="#D9D9D9"
            icon="share"
            onPress={onShare}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={styles.shareButtonText}>Share Story</Text>
          </Button>

          <Text style={styles.authorProcess}>Author's Process</Text>

          <RenderHTML
            contentWidth={width}
            source={story.process}
            baseStyle={styles.process}
          />

          <View style={styles.author}>
            <Image
              style={styles.authorImage}
              source={{ uri: story.author_image }}
            />
            <Text style={styles.authorText}>By {story.author_name}</Text>
          </View>

          <Button
            textColor="black"
            icon="arrow-up"
            onPress={scrollUp}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={styles.backToTopButtonText}>Back To Top</Text>
          </Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
