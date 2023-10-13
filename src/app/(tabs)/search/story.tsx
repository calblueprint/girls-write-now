import React, { createRef, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Image,
  Text,
  Share,
  Button,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles from '../../../styles/globalStyles';

import jsonStory from '../../../database/story.json';

function htmlParser(html: string) {
  const regex = /(<h2(.*?)h2>)(\n+<p(.*?)p>)+()/; // regex grabs heading and paragraph tags for story
  const corresp = regex.exec(html);
  const story = corresp ? corresp[0] : ''; // <h2>heading<h2> <p>paragraph1</p> ...
  return story;
}

function StoryScreen() {
  const [isLoading, setLoading] = useState(true);
  const [title, setTitle] = useState(String);
  const [content, setContent] = useState(String);
  const [author, setAuthor] = useState(String);
  const [genres, setGenres] = useState(['']);

  // Load Wordpress API and its contents
  const getStory = async (id: string) => {
    try {
      const url = `https://girlswritenow.org/wp-json/wp/v2/story/${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setTitle(json.title.rendered);
      setContent(json.content.rendered);
      setAuthor(jsonStory.author);
      setGenres(jsonStory['genre-medium'].map(txt => `<li>${txt}</li>`)); // .map(txt => `<p>${txt}</p>`)
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

  // const backToTop = () => {

  // }

  useEffect(() => {
    getStory('170947');
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <Image
            style={{ width: '100%', height: '5%' }}
            source={{ uri: jsonStory.featured_media }}
          />
          <Text>By {author}</Text>
          <HTMLView value={genres.toString().replace(',', '')} />

          <Button onPress={onShare} title="Share Story" />
          <HTMLView value={title} />
          <HTMLView value={htmlParser(content)} />
          <Button onPress={onShare} title="Share Story" />
          {/* Need a way of getting the auhtor'sprocess/story can prolly be done in the regex */}
          <Text>By {author}</Text>
          {/* <Button onPress={backToTop} title="Back to Top" /> */}
          <Text>{'\n\n\n\n\n\n\n\n\n\n\n\n\n\n'}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default StoryScreen;
