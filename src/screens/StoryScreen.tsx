import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default function StoryScreen() {
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
