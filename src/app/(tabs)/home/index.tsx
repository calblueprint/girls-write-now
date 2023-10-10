import { Link } from 'expo-router';
import { Button, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContentCard from '../../../components/ContentCard/ContentCard';
import SearchCard from '../../../components/SearchCard/SearchCard';
import globalStyles from '../../../styles/globalStyles';
import styles from './styles';

const dummyStories = [
  {
    title: 'The Witch and Her Wings',
    author: 'Victoria V.',
    image: '',
    author_image: '',
    tags: ['Non-fiction', 'Mysterious', 'Goofy', 'Silly', 'Adventurous'],
  },
  {
    title: "It's Carnival",
    author: 'Victoria V.',
    image: '',
    author_image: '',
    tags: ['Non-fiction', 'Mysterious'],
  },
  {
    title: "Akshay's Adventures",
    author: 'Victoria V.',
    image: '',
    author_image: '',
    tags: ['Non-fiction', 'Mysterious'],
  },
];

function HomeScreen() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.headerContainer}>
          <Text style={globalStyles.h4}>Welcome, Brenda</Text>
          <Link href="/settings" asChild>
            <Button title="Settings" />
          </Link>
        </View>
        <Text style={styles.featuredSubheading}>Featured Stories</Text>
        <Text style={[globalStyles.body2, styles.featuredDescription]}>
          Celebrate lorem ipsum by diving into related stories from our talented
          authors.
        </Text>
        <View style={styles.featuredContainer}>
          {dummyStories.map(story => (
            <SearchCard
              key={story.title}
              title={story.title}
              author={story.author}
              image={story.image}
              authorImage={story.author_image}
              tags={story.tags}
              pressFunction={() => null}
            />
          ))}
        </View>
        <Text style={styles.subheading}>Recommended For You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.scrollView}
        >
          {dummyStories.map(story => (
            <ContentCard
              key={story.title}
              title={story.title}
              author={story.author}
              pressFunction={() => null}
              image={story.image}
            />
          ))}
        </ScrollView>
        <Text style={styles.subheading}>New Stories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          style={styles.scrollView}
        >
          {dummyStories.map(story => (
            <ContentCard
              key={story.title}
              title={story.title}
              author={story.author}
              pressFunction={() => null}
              image={story.image}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
