import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import { fetchStory } from '../../../queries/stories';
import { Story, systemFonts } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const scrollRef = React.useRef<any>(null);
  const [story, setStory] = useState<Story>({} as Story);

  const params = useLocalSearchParams<{ storyId: string }>();
  const { storyId } = params;

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
          <Image style={styles.image} source={{ uri: story.featured_media }} />

          <Text style={[globalStyles.h1, styles.title]}>{story?.title}</Text>

          <View style={styles.author}>
            <Image
              style={styles.authorImage}
              source={{ uri: story.author_image }}
            />
            <Text style={globalStyles.body1}>{story.author_name}</Text>
          </View>

          <View>
            <FlatList
              style={styles.genres}
              horizontal
              data={story.genre_medium}
              renderItem={({ item }) => (
                <View style={styles.genresBorder}>
                  <Text style={globalStyles.button1}>{item}</Text>
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
              <Text style={globalStyles.bodyUnderline}>Share Story</Text>
            </Button>
          </View>

          <RenderHTML
            source={story.excerpt}
            baseStyle={styles.excerpt}
            systemFonts={systemFonts}
          />

          <RenderHTML
            source={story.content}
            baseStyle={styles.story}
            systemFonts={systemFonts}
          />

          <Button
            textColor="black"
            buttonColor="#D9D9D9"
            icon="share"
            onPress={onShare}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={globalStyles.bodyUnderline}>Share Story</Text>
          </Button>

          <Text style={globalStyles.h3}>Author's Process</Text>

          <RenderHTML
            source={story.process}
            baseStyle={styles.process}
            systemFonts={systemFonts}
          />

          <View style={styles.author}>
            <Image
              style={styles.authorImage}
              source={{ uri: story.author_image }}
            />
            <Text style={globalStyles.body1}>{story.author_name}</Text>
          </View>

          <Button
            textColor="black"
            icon="arrow-up"
            onPress={scrollUp}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={globalStyles.bodyBoldUnderline}>Back To Top</Text>
          </Button>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
