import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
  },
  image: {
    width: '100%',
    height: 153,
    marginBottom: 16,
  },
  authorImage: {
    backgroundColor: '#D9D9D9',
    width: 21,
    height: 21,
    borderRadius: 100 / 2,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  authorText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  genres: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    marginBottom: 16,
  },
  genresBorder: {
    backgroundColor: '#D9D9D9',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  genresText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    backgroundColor: '#D9D9D9',
  },
  shareButtonText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'underline',
    backgroundColor: '#D9D9D9',
  },
  excerpt: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    paddingBottom: 12,
  },
  story: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  authorProcess: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  process: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  backToTopButtonText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
  },
});
