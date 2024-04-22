import { Ionicons } from '@expo/vector-icons';
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
} from 'react-native';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Icon from '../../../../assets/icons';
import AuthorImage from '../../../components/AuthorImage/AuthorImage';
import ReactionPicker from '../../../components/ReactionPicker/ReactionPicker';
import { fetchStory } from '../../../queries/stories';
import { Story } from '../../../queries/types';
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
  const htmlContent = story?.excerpt?.html ? story.excerpt.html : '';

  // Add the quotation marks after the start of the <p> tag and before the end of the </p> tag
  const modifiedExcerpt = htmlContent
    .replace(/<p [^>]*>/, match => `${match}&ldquo;`)
    .replace('</p>', '&rdquo;</p>');
  console.log(typeof htmlContent);

  console.log('TESTING CONTENT', htmlContent);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ScrollView
            bounces
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              {story?.featured_media ? (
                <Image
                  style={styles.image}
                  source={{ uri: story.featured_media }}
                />
              ) : (
                <Text>No image available</Text>
              )}
            </View>

            <Text style={styles.title}>{story?.title}</Text>

            <AuthorImage
              author_name={story.author_name}
              author_Uri={story.author_image}
              author_id={story.author_id.toString()}
            />

            <View>
              <FlatList
                style={styles.genres}
                horizontal
                data={story.genre_medium}
                keyExtractor={(item, index) => index.toString()} // Add a key extractor for performance optimization
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.genresBorder,
                      {
                        backgroundColor:
                          index % 2 === 0 ? '#E66E3F' : '#B49BC6',
                      },
                    ]}
                  >
                    <Text style={styles.genresText}>{item}</Text>
                  </View>
                )}
              />

              <View style={styles.button_style}>
                <Icon type="share_outline" />
                <Text style={styles.shareButtonText}>Share Story</Text>
              </View>
            </View>

            <RenderHTML
              source={{ html: modifiedExcerpt }}
              baseStyle={globalStyles.h2}
              tagsStyles={{ p: globalStyles.h2 }}
              ignoredStyles={['color', 'fontSize', 'fontWeight']} // Ignore these inline styles
            />

            <RenderHTML source={story.content} baseStyle={styles.story} />

            <View style={styles.button_style}>
              <Icon type="share_outline" />
              <Text style={styles.shareButtonText}>Share Story</Text>
            </View>
            <Text style={styles.authorProcess}>Author's Process</Text>

            <RenderHTML source={story.process} baseStyle={styles.process} />

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
            <View style={styles.bottomReactionContainer} />
          </ScrollView>
          <ReactionPicker />
        </View>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
