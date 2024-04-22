import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import ContentCard from '../../../components/ContentCard/ContentCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';

import { fetchUsername } from '../../../queries/profiles';
import {
  fetchFeaturedStoriesDescription,
  fetchFeaturedStoriesHeader,
  fetchFeaturedStoryPreviews,
  fetchNewStories,
  fetchRecommendedStories,
  fetchStoryPreviewById,
} from '../../../queries/stories';
import { StoryCard, StoryPreview } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function HomeScreen() {
  const { user } = useSession();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [featuredStories, setFeaturedStories] = useState<StoryPreview[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<StoryPreview[]>([]);
  const [featuredStoriesDescription, setFeaturedStoriesDescription] =
    useState<string>('');
  const [featuredStoriesHeader, setFeaturedStoriesHeader] = useState('');
  const [recommendedStories, setRecommendedStories] = useState<StoryCard[]>([]);
  const [newStories, setNewStories] = useState<StoryCard[]>([]);

  const getRecentStory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('GWN_RECENT_STORIES_ARRAY');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log(error);
    }
  };

  const setRecentStory = async (recentStories: StoryCard[]) => {
    try {
      const jsonValue = JSON.stringify(recentStories);
      await AsyncStorage.setItem('GWN_RECENT_STORIES_ARRAY', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStoryPreviewPressed = (story: StoryPreview) => {
    recentlyViewedStacking(story);
    router.push({
      pathname: '/story',
      params: { storyId: story.id.toString() },
    });
  };

  const handleStoryCardPressed = async (story: StoryCard) => {
    const newStoryArray = await fetchStoryPreviewById(story.id);
    recentlyViewedStacking(newStoryArray[0]);
    router.push({
      pathname: '/story',
      params: { storyId: story.id.toString() },
    });
  };

  const recentlyViewedStacking = async (story: StoryPreview) => {
    const maxArrayLength = 5;
    const newRecentlyViewed = [...recentlyViewed];

    for (let i = 0; i < recentlyViewed.length; i++) {
      if (story.id === recentlyViewed[i].id) {
        newRecentlyViewed.splice(i, 1);
        break;
      }
    }

    if (newRecentlyViewed.length >= maxArrayLength) {
      newRecentlyViewed.splice(-1, 1);
    }

    newRecentlyViewed.splice(0, 0, story);

    setRecentStory(newRecentlyViewed);
    setRecentlyViewed(newRecentlyViewed);
  };

  useEffect(() => {
    const updateRecommendedStories = async () => {
      const recentStoryResponse = await getRecentStory();

      const recommendedStoriesResponse =
        await fetchRecommendedStories(recentStoryResponse);
      setRecommendedStories(recommendedStoriesResponse);
    };

    (async () => {
      const [
        usernameResponse,
        featuredStoryResponse,
        featuredStoryHeaderResponse,
        featuredStoryDescriptionResponse,
        newStoriesResponse,
        recentStoryResponse,
        _,
      ] = await Promise.all([
        fetchUsername(user?.id).catch(() => ''),
        fetchFeaturedStoryPreviews().catch(() => []),
        fetchFeaturedStoriesHeader().catch(() => ''),
        fetchFeaturedStoriesDescription().catch(() => ''),
        fetchNewStories().catch(() => []),
        getRecentStory(),
        updateRecommendedStories(),
      ]);

      setUsername(usernameResponse);
      setFeaturedStories(featuredStoryResponse);
      setFeaturedStoriesHeader(featuredStoryHeaderResponse);
      setFeaturedStoriesDescription(featuredStoryDescriptionResponse);
      setNewStories(newStoriesResponse);
      setRecentlyViewed(recentStoryResponse);
    })().finally(() => {
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView
      style={[
        globalStyles.tabBarContainer,
        { marginLeft: -8, marginRight: -32 },
      ]}
    >
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View style={styles.headerContainer}>
          <Text style={[globalStyles.h1, { paddingBottom: 24 }]}>
            {username ? `Welcome, ${username}` : 'Welcome!'}
          </Text>
        </View>

        {featuredStories.length > 0 && (
          <View>
            <Text style={[globalStyles.h2, { paddingBottom: 16 }]}>
              Featured Stories
            </Text>
            {featuredStoriesHeader != null && featuredStoriesHeader != '' && (
              <Text style={[globalStyles.h3, { paddingBottom: 16 }]}>
                {featuredStoriesHeader}
              </Text>
            )}
            {featuredStoriesHeader != '' &&
              featuredStoriesDescription != null &&
              featuredStoriesDescription != '' && (
                <Text style={[globalStyles.body1, styles.featuredDescription]}>
                  {featuredStoriesDescription}
                </Text>
              )}
            <View style={{ marginRight: 24 }}>
              {featuredStories.map(story => (
                <PreviewCard
                  key={story.id}
                  storyId={story.id}
                  title={story.title}
                  image={story.featured_media}
                  author={story.author_name}
                  authorImage={story.author_image}
                  excerpt={story.excerpt}
                  tags={story.genre_medium
                    .concat(story.tone)
                    .concat(story.topic)}
                  pressFunction={() => handleStoryPreviewPressed(story)}
                />
              ))}
            </View>
          </View>
        )}
        {recommendedStories.length > 0 && (
          <View>
            <Text style={[globalStyles.h3, styles.subheading]}>
              Recommended For You
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={styles.scrollView1}
            >
              {recommendedStories.map(story => (
                <ContentCard
                  id={story.id}
                  storyId={story.id}
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  pressFunction={() => handleStoryCardPressed(story)}
                  image={story.featured_media}
                />
              ))}
            </ScrollView>
          </View>
        )}
        {newStories.length > 0 && (
          <View>
            <Text style={[globalStyles.h3, styles.subheading]}>
              New Stories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={styles.scrollView2}
            >
              {newStories.map(story => (
                <ContentCard
                  id={story.id}
                  storyId={story.id}
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  pressFunction={() => handleStoryCardPressed(story)}
                  image={story.featured_media}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
