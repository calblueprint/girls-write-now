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
      const usernameResponse = await fetchUsername(user?.id);
      setUsername(usernameResponse);
      const featuredStoryResponse: StoryPreview[] =
        await fetchFeaturedStoryPreviews();
      setFeaturedStories(featuredStoryResponse);
      const featuredStoryDescriptionResponse: string =
        await fetchFeaturedStoriesDescription();
      setFeaturedStoriesDescription(featuredStoryDescriptionResponse);
      const recommendedStoriesResponse: StoryCard[] =
        await fetchRecommendedStories();
      setRecommendedStories(recommendedStoriesResponse);
      const newStoriesResponse: StoryCard[] = await fetchNewStories();
      setNewStories(newStoriesResponse);
    })().finally(() => {
      setLoading(false);
    });
  }, []);
  return (
    <SafeAreaView style={[globalStyles.container, { marginHorizontal: -8 }]}>
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
          <Text style={globalStyles.h2}>Welcome, {username}</Text>
          <Pressable onPress={() => router.push('/settings')}>
            <View>
              <Icon type="settings_gear" />
            </View>
          </Pressable>
        </View>
        <Text style={globalStyles.h3}>Featured Stories</Text>
        <Text style={[globalStyles.body1, styles.featuredDescription]}>
          {featuredStoriesDescription}
        </Text>
        <View>
          {featuredStories.map(story => (
            <PreviewCard
              key={story.title}
              title={story.title}
              image={story.featured_media}
              author={story.author_name}
              authorImage={story.author_image}
              excerpt={story.excerpt}
              tags={story.genre_medium.concat(story.tone).concat(story.topic)}
              pressFunction={() => null}
            />
          ))}
        </View>
        <Text style={[globalStyles.h3, styles.subheading]}>
          Recommended For You
        </Text>
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
              pressFunction={() => null}
              image={story.featured_media}
            />
          ))}
        </ScrollView>
        <Text style={[globalStyles.h3, styles.subheading]}>New Stories</Text>
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
              pressFunction={() => null}
              image={story.featured_media}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
