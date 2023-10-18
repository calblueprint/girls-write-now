import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  Text,
  View,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import jsonStory from '../../../database/story.json';
import globalStyles from '../../../styles/globalStyles';
import temp from '../../../styles/temp';

function htmlParser(htmlString: string) {
  const regexHeading = /(<h2(.*?)h2>)/;
  const regexStory = /(\n+<p(.*?)p>)+/; // regex grabs heading and paragraph tags for story
  const regexProcess = /<p>&nbsp(.*?)p>/;

  const heading = regexHeading.exec(htmlString);
  const story = regexStory.exec(htmlString);
  const process = regexProcess.exec(htmlString);

  const contentHeading = heading
    ? heading[0].replace('<h2', '<h3').replace('</h2>', '</h3>')
    : ''; // <h2>heading<h2>
  const contentStory = story ? story[0].replace(/(\n)+/gi, '') : ''; // <p>paragraph1</p> ...
  const contentProcess = process ? process[0].replace('&nbsp;', '') : '';
  return {
    heading: contentHeading,
    story: contentStory,
    process: contentProcess,
  };
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
        `<body><ul>${jsonStory['genre-medium']
          .map(txt => `<li>${txt}</li>`)
          .toString()
          .replace(',', '')}</ul></body>`,
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
          `${title}\n` +
          `By ${author}\n\n\n` +
          `${htmlParser(content).heading.replace(/<[^>]+>/g, '\n')}` +
          `${htmlParser(content).story.replace(/<[^>]+>/g, '\n')}\n\n\n` +
          `Author's Process:\n` +
          `${htmlParser(content).process.replace(/<[^>]+>/g, '')}`,
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
          {/* STYLING & URI WARNING */}
          <Image
            style={temp.image}
            source={{ uri: image ? image : undefined }}
          />

          <View>
            <HTMLView
              value={title.replace(title, `<body><br><h2>${title}</h2></body>`)}
            />
          </View>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button textColor="black" icon="circle">
              {''}
            </Button>
            <Text style={temp.body}>By {author}</Text>
            <Text>{'\n'}</Text>
          </View>

          <View style={{ backgroundColor: '#D9D9D9', borderRadius: 10 }}>
            <HTMLView value={genres} />
          </View>
          <Text>{'\n'}</Text>

          <View style={{ alignItems: 'flex-start' }}>
            <Button
              textColor="black"
              buttonColor="#D9D9D9"
              icon="share"
              onPress={onShare}
            >
              Share Story
            </Button>
          </View>
          <Text>{'\n'}</Text>

          <HTMLView value={htmlParser(content).heading} />

          <HTMLView value={htmlParser(content).story} />
          <Text>{'\n'}</Text>

          <View style={{ alignItems: 'flex-start' }}>
            <Button
              textColor="black"
              buttonColor="#D9D9D9"
              icon="share"
              onPress={onShare}
            >
              Share Story
            </Button>
          </View>
          <Text>{'\n'}</Text>

          <Text style={globalStyles.h4}>Author's Process</Text>
          <Text>{'\n'}</Text>

          <HTMLView value={htmlParser(content).process} />
          <Text>{'\n'}</Text>

          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Button textColor="black" icon="circle">
              {''}
            </Button>
            <Text style={temp.body}>By {author}</Text>
          </View>
          <Text>{'\n\n'}</Text>

          {/* <Button onPress={backToTop} title="Back to Top" /> */}
          <View style={{ alignItems: 'flex-start' }}>
            <Button
              textColor="black"
              buttonColor="#D9D9D9"
              icon="arrow-up"
              onPress={onShare}
            >
              Back To Top
            </Button>
          </View>
          <Text>{'\n\n\n\n\n\n\n\n\n\n'}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
