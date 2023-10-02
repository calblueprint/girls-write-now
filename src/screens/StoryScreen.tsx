import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import HTMLView from 'react-native-htmlview';

export default function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);

  const getStory = async () => {
    try {
      const response = await fetch(
        'https://girlswritenow.org/wp-json/wp/v2/story/170947',
      );
      const json = await response.json();
      setTitle(json.title.rendered);
      setContent(json.content.rendered);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <HTMLView value={title} />
          <HTMLView value={content} />
        </ScrollView>
      )}
    </View>
  );
}
