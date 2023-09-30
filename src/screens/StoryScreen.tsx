import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

// type Story = {
//   content: string;
// };

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
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStory();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Story Page</Text>

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text>
          {title}
          {'\n'}
          {content}
        </Text> // title shows weird symbols and content shows
      )}
    </View>
  );
}
