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
import { storyObject } from '../../../utils/story';

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const scrollRef = React.useRef<any>(null);
  const [story, setStory] = useState<any>();

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

  const scrollUp = () => {
    scrollRef.current?.scrollTo({ x: 0, y: 0 });
  };

  useEffect(() => {
    setStory(storyObject);
    setLoading(false);
  }, []);

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

          <Text style={styles.title}>{story.title}</Text>

          <View style={styles.author}>
            <Image style={styles.authorImage} source={{ uri: '' }} />
            <Text style={styles.authorText}>By {story.author}</Text>
          </View>

          <View>
            <FlatList
              style={styles.genres}
              horizontal
              data={story.genreMedium}
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

          <RenderHTML source={storyObject.excerpt} baseStyle={styles.excerpt} />

          <RenderHTML source={storyObject.content} baseStyle={styles.story} />

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

          <RenderHTML source={storyObject.process} baseStyle={styles.process} />

          <View style={styles.author}>
            <Image style={styles.authorImage} source={{ uri: '' }} />
            <Text style={styles.authorText}>By {story.author}</Text>
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
