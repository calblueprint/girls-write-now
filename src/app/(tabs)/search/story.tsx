import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  Text,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import jsonStory from '../../../database/story.json';
import globalStyles from '../../../styles/globalStyles';

const storyStyles = {
  image: {
    width: '100%',
    height: '5%',
  },
};

function htmlParser(htmlString: string) {
  const regexHeading = /(<h2(.*?)h2>)/;
  const regexStory = /(\n+<p(.*?)p>)+/; // regex grabs heading and paragraph tags for story
  const regexTitle = /<p>&nbsp(.*?)p>/;

  const heading = regexHeading.exec(htmlString);
  const story = regexStory.exec(htmlString);
  const title = regexTitle.exec(htmlString);

  const storyContent = story ? story[0] : ''; // <h2>heading<h2> <p>paragraph1</p> ...
  const storyTitle = title ? title[0] : '';
  return [storyContent, storyTitle];
}

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [author, setAuthor] = useState(String);
  const [genres, setGenres] = useState(String);
  const [image, setImage] = useState(String);

  // Load Wordpress API and its contents
  const getStory = async (id: string) => {
    try {
      const url = `https://girlswritenow.org/wp-json/wp/v2/story/${id}`;
      const response = await fetch(url);
      const json = await response.json();

      setTitle(json.title.rendered);
      setContent(json.content.rendered);
      setAuthor(jsonStory.author);
      setGenres(
        `${
          jsonStory['genre-medium']
            .map(txt => `<font color="#D9D9D9">${txt}</font>`)
            .toString()
            .replace(',', '') // <Text>${txt}</Text>
        }`,
      );
      setImage(jsonStory.featured_media);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Share Story Button action
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.error(error);
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
          <Image style={storyStyles.image} source={{ uri: image }} />

          <Text style={{ fontSize: 24 }}>By {author}</Text>
          {/* style={{backgroundColor: '#D9D9D9', display: 'flex', flexDirection: 'row-reverse'}} */}

          <HTMLView value={genres} />

          <Button buttonColor="#D9D9D9" icon="inbox-arrow-up" onPress={onShare}>
            Share Story
          </Button>
          <HTMLView value={title} />
          <HTMLView value={htmlParser(content)[0]} />
          <Button buttonColor="#D9D9D9" icon="inbox-arrow-up" onPress={onShare}>
            Share Story
          </Button>
          <Text>Author's Process</Text>
          <HTMLView value={htmlParser(content)[1]} />
          <Text>By {author}</Text>
          {/* <Button onPress={backToTop} title="Back to Top" /> */}
          <Text>{'\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
