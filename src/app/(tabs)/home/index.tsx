import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './styles';
import Icon from '../../../../assets/icons';
import ContentCard from '../../../components/ContentCard/ContentCard';
import PreviewCard from '../../../components/PreviewCard/PreviewCard';
import ReactionPicker from '../../../components/ReactionPicker/ReactionPicker';
import RecentSearchCard from '../../../components/RecentSearchCard/RecentSearchCard';
import { fetchUsername } from '../../../queries/profiles';
import {
  fetchFeaturedStoriesDescription,
  fetchFeaturedStoryPreviews,
  fetchNewStories,
  fetchRecommendedStories,
} from '../../../queries/stories';
import { StoryCard, StoryPreview } from '../../../queries/types';
import globalStyles from '../../../styles/globalStyles';
import { useSession } from '../../../utils/AuthContext';

function HomeScreen() {
  const { user } = useSession();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [featuredStories, setFeaturedStories] = useState<StoryPreview[]>([]);
  const [featuredStoriesDescription, setFeaturedStoriesDescription] =
    useState<string>('');
  const [recommendedStories, setRecommendedStories] = useState<StoryCard[]>([]);
  const [newStories, setNewStories] = useState<StoryCard[]>([]);

  useEffect(() => {
    (async () => {
      const [
        usernameResponse,
        featuredStoryResponse,
        featuredStoryDescriptionResponse,
        recommendedStoriesResponse,
        newStoriesResponse,
      ] = await Promise.all([
        fetchUsername(user?.id).catch(() => ''),
        fetchFeaturedStoryPreviews().catch(() => []),
        fetchFeaturedStoriesDescription().catch(() => ''),
        fetchRecommendedStories().catch(() => []),
        fetchNewStories().catch(() => []),
      ]);
      setUsername(usernameResponse);
      setFeaturedStories(featuredStoryResponse);
      setFeaturedStoriesDescription(featuredStoryDescriptionResponse);
      setRecommendedStories(recommendedStoriesResponse);
      setNewStories(newStoriesResponse);
    })().finally(() => {
      setLoading(false);
    });
  }, [user]);

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
        bounces={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <View style={styles.headerContainer}>
          <Text style={globalStyles.h2}>
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
                  key={story.title}
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
            <ReactionPicker />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              style={styles.scrollView}
            >
              {recommendedStories.map(story => (
                <ContentCard
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
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
              style={styles.scrollView}
            >
              {newStories.map(story => (
                <ContentCard
                  key={story.title}
                  title={story.title}
                  author={story.author_name}
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
