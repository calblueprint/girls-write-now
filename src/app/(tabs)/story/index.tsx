import { router, useLocalSearchParams } from 'expo-router';
import * as cheerio from 'cheerio';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Icon from '../../../../assets/icons';
import AuthorImage from '../../../components/AuthorImage/AuthorImage';
import ReactionPicker from '../../../components/ReactionPicker/ReactionPicker';
import { fetchStory } from '../../../queries/stories';
import { Story } from '../../../queries/types';
import globalStyles, { fonts } from '../../../styles/globalStyles';
import BackButton from '../../../components/BackButton/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionBar from '../../../components/OptionBar/OptionBar';

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

  return (
    <SafeAreaView style={[globalStyles.tabBarContainer, styles.container]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <ScrollView
            stickyHeaderIndices={[5]}
            bounces
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
          >
            <BackButton pressFunction={() => router.back()} />
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

            <Text style={[globalStyles.h1, styles.title]}>{story?.title}</Text>

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
                keyExtractor={(_, index) => index.toString()} // Add a key extractor for performance optimization
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
            </View>
            <OptionBar
              story={story}
              storyId={parseInt(storyId as string, 10)}
            />

            <RenderHTML
              source={{
                html: `"${cheerio.load(story.excerpt.html ?? '').text()}"`,
              }}
              baseStyle={globalStyles.h2}
              contentWidth={width}
              systemFonts={fonts}
              tagsStyles={{ p: globalStyles.h2 }}
              ignoredStyles={['color', 'fontSize', 'fontWeight']} // Ignore these inline styles
            />

            <View style={{ marginTop: 32 }} />

            <RenderHTML
              systemFonts={fonts}
              source={story.content}
              contentWidth={width}
              baseStyle={styles.story}
            />

            <TouchableOpacity>
              <Icon type="share_outline" />
            </TouchableOpacity>

            <Text style={styles.authorProcess}>Author's Process</Text>

            <RenderHTML
              systemFonts={fonts}
              source={story.process}
              contentWidth={width}
              baseStyle={styles.process}
            />

            <View style={styles.author}>
              <Image
                style={styles.authorImage}
                source={{ uri: story.author_image }}
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

            <OptionBar
              story={story}
              storyId={parseInt(storyId as string, 10)}
            />

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
        </View>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
