import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Icon from '../../../../assets/icons';
import ContentCard from '../../../components/ContentCard/ContentCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import { fetchUsername } from '../../../queries/profiles';
import {
  fetchFeaturedStoriesDescription,
  fetchFeaturedStoryPreviews,
  fetchNewStories,
  fetchRecommendedStories,
} from '../../../queries/stories';
import { StoryCard, StoryPreview, Story } from '../../../queries/types';
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
  const [recommendedStories, setRecommendedStories] = useState<StoryCard[]>([]);
  const [newStories, setNewStories] = useState<StoryCard[]>([]);

  const setRecentStory = async (recentStories: StoryPreview[]) => {
    try {
      const jsonValue = JSON.stringify(recentStories);
      await AsyncStorage.setItem('GWN_RECENT_STORIES_ARRAY', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getRecentStory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(
          'GWN_RECENT_STORIES_ARRAY',
        );
        return jsonValue != null ? JSON.parse(jsonValue) : [];
      } catch (error) {
        console.log(error);
      }
    };

    const getRecommendedStories = async () => {
      const recentStoryResponse = await getRecentStory();
      // console.log('recentStoryResponse', recentStoryResponse);
      // setRecentlyViewed(recentStoryResponse);
      // console.log('state: recentlyViewed', recentlyViewed);
      const recommendedStoriesResponse =
        await fetchRecommendedStories(recentStoryResponse);
      setRecommendedStories(recommendedStoriesResponse);
      // return recommendedStoriesResponse;
    };

    (async () => {
      const [
        usernameResponse,
        featuredStoryResponse,
        featuredStoryDescriptionResponse,
        // recommendedStoriesResponse,
        newStoriesResponse,
        // recentStoryResponse,
      ] = await Promise.all([
        fetchUsername(user?.id).catch(() => ''),
        fetchFeaturedStoryPreviews().catch(() => []),
        fetchFeaturedStoriesDescription().catch(() => ''),
        // fetchRecommendedStories(recentlyViewed).catch(() => []), // need to set recentlyViewed before
        fetchNewStories().catch(() => []),
        // getRecentStory(),
      ]);
      setUsername(usernameResponse);
      setFeaturedStories(featuredStoryResponse);
      setFeaturedStoriesDescription(featuredStoryDescriptionResponse);
      // setRecommendedStories(recommendedStoriesResponse);
      setNewStories(newStoriesResponse);
      // setRecentlyViewed(recentStoryResponse);
      await getRecommendedStories();
    })().finally(() => {
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {}, []);

  // console.log(recommendedStories);
  return (
    <SafeAreaView
      style={[globalStyles.container, { marginLeft: -8, marginRight: -32 }]}
    >
      {loading && (
        <View style={styles.loading}>
          <Text>Loading</Text>
        </View>
      )}
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View style={styles.headerContainer}>
          <Text style={globalStyles.h1}>
            {username ? `Welcome, ${username}` : 'Welcome!'}
          </Text>
          <Pressable onPress={() => router.push('/settings')}>
            <View>
              <Icon type="settings_gear" />
            </View>
          </Pressable>
        </View>

        {featuredStories.length > 0 && (
          <View>
            <Text style={globalStyles.h3}>Featured Stories</Text>
            <Text style={[globalStyles.body1, styles.featuredDescription]}>
              {featuredStoriesDescription}
            </Text>
            <View style={{ marginRight: 24 }}>
              {featuredStories.map(story => (
                <PreviewCard
                  key={story.id}
                  title={story.title}
                  image={story.featured_media}
                  author={story.author_name}
                  authorImage={story.author_image}
                  excerpt={story.excerpt}
                  tags={story.genre_medium
                    .concat(story.tone)
                    .concat(story.topic)}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
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
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
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
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
                  authorImage={story.author_image}
                  pressFunction={() =>
                    router.push({
                      pathname: '/story',
                      params: { storyId: story.id.toString() },
                    })
                  }
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
