import { decode } from 'html-entities';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Share,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import jsonStory from '../../../database/story.json';
import globalStyles from '../../../styles/globalStyles';

function htmlParser(htmlString: string) {
  const regexHeading = /(<h2(.*?)h2>)/;
  const regexStory = /(\n+<p(.*?)p>)+/;
  const regexProcess = /<p>&nbsp(.*?)p>/;

  const heading = regexHeading.exec(htmlString);
  const story = regexStory.exec(htmlString);
  const process = regexProcess.exec(htmlString);

  const contentHeading = heading
    ? decode(heading[0], { level: 'html5' })
        .replace('</h2>', '')
        .replace(/<h2.+>/, '')
    : '';
  const contentStory = story
    ? decode(story[0], { level: 'html5' })
        .replace(/(\n)+/gi, '')
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '\n\n')
    : '';
  const contentProcess = process
    ? decode(process[0], { level: 'html5' })
        .replace(/<p>/gi, '')
        .replace(/<\/p>/gi, '')
    : '';
  return {
    heading: contentHeading,
    story: contentStory,
    process: contentProcess,
  };
}

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState(String);
  const [story, setStory] = useState(String);
  const [heading, setHeading] = useState(String);
  const [process, setProcess] = useState(String);
  const [author, setAuthor] = useState(String);
  const [genres, setGenres] = useState(['']);
  const [image, setImage] = useState(String);
  const ref = React.useRef<any>(null);

  // Load Wordpress API and its contents
  const getStory = async (id: string) => {
    try {
      const url = `https://girlswritenow.org/wp-json/wp/v2/story/${id}`;
      const response = await fetch(url);
      const json = await response.json();

      setTitle(decode(json.title.rendered));
      setStory(htmlParser(json.content.rendered).story);
      setHeading(htmlParser(json.content.rendered).heading);
      setProcess(htmlParser(json.content.rendered).process);
      setAuthor(jsonStory.author);
      setGenres(jsonStory['genre-medium']);
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
        message: `Check out this story from Girls Write Now!!!\nhttps://girlswritenow.org/story/${jsonStory.slug}/`,
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

  const scrollUp = () => {
    ref.current?.scrollTo({ x: 0, y: 0 });
  };

  useEffect(() => {
    getStory('170947');
  }, []);

  return (
    <SafeAreaView style={tempStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView bounces ref={ref}>
          <Image style={tempStyles.image} source={{ uri: image }} />

          <View style={tempStyles.top}>
            <Text style={tempStyles.title}>{title}</Text>

            <View style={tempStyles.author}>
              <Image style={tempStyles.authorImage} source={{ uri: '' }} />
              <Text style={tempStyles.authorText}>By {author}</Text>
            </View>

            <View>
              <FlatList
                style={tempStyles.genres}
                horizontal
                data={genres}
                renderItem={({ item }) => (
                  <View style={tempStyles.genresBorder}>
                    <Text style={tempStyles.genresText}>{item}</Text>
                  </View>
                )}
              />
            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Button
                textColor="black"
                buttonColor="#D9D9D9"
                icon="share"
                onPress={onShare}
              >
                <Text style={tempStyles.shareButtonText}>Share Story</Text>
              </Button>
            </View>
          </View>

          <Text style={tempStyles.heading}>{heading}</Text>

          <Text style={tempStyles.story}>{story}</Text>

          <View style={tempStyles.bottom}>
            <View style={{ alignItems: 'flex-start' }}>
              <Button
                textColor="black"
                buttonColor="#D9D9D9"
                icon="share"
                onPress={onShare}
              >
                <Text style={tempStyles.shareButtonText}>Share Story</Text>
              </Button>
            </View>

            <Text style={globalStyles.h4}>Author's Process</Text>

            <Text style={tempStyles.process}>{process}</Text>

            <View style={tempStyles.author}>
              <Image style={tempStyles.authorImage} source={{ uri: '' }} />
              <Text style={tempStyles.authorText}>By {author}</Text>
            </View>

            <View style={{ alignItems: 'flex-start' }}>
              <Button textColor="black" icon="arrow-up" onPress={scrollUp}>
                <Text style={tempStyles.backToTopButtonText}>Back To Top</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;

const tempStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
  },
  image: {
    width: '100%',
    height: 153,
  },
  authorImage: {
    backgroundColor: '#D9D9D9',
    width: 21,
    height: 21,
    borderRadius: 100 / 2,
  },
  top: {
    justifyContent: 'space-between',
    gap: 16,
    paddingTop: 20,
    paddingBottom: 34,
  },
  bottom: {
    justifyContent: 'space-between',
    gap: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  authorText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  genres: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
  },
  genresBorder: {
    backgroundColor: '#D9D9D9',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginRight: 8,
  },
  genresText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    color: 'black',
    backgroundColor: '#D9D9D9',
  },
  shareButtonText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    textDecorationLine: 'underline',
  },
  heading: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    paddingBottom: 34,
  },
  story: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  process: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
  },
  backToTopButtonText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'left',
    color: 'black',
  },
});
