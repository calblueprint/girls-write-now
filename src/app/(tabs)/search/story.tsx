import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import HTMLView from 'react-native-htmlview';
import globalStyles from '../../../../globalStyles';

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);

  const getStory = async (id: string) => {
    try {
      const url = `https://girlswritenow.org/wp-json/wp/v2/story/${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.title.rendered);
      setContent(json.content.rendered);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStory('170947');
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <HTMLView value={title} />
          <HTMLView value={content} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
