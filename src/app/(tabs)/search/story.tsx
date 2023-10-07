import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../styles/globalStyles';

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

  const htmlParser = (html: string) => {
    const regex = /<p>(.*?)<\/p>/;
    const corresp = regex.exec(html);
    const firstParagraph = corresp ? corresp[0] : ''; // <p>text1</p>
    const firstParagraphWithoutHtml = corresp ? corresp[1] : ''; // text1
    return firstParagraph;
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
          <HTMLView value={htmlParser(content)} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
