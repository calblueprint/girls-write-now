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
import { RenderHTML } from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';

import jsonStory from '../../../database/story.json';

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
  const scrollRef = React.useRef<any>(null);

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
    scrollRef.current?.scrollTo({ x: 0, y: 0 });
  };

  useEffect(() => {
    getStory('170947');
  }, []);

  const html = `<p><strong>Cristina<\/strong><\/p>\n\n\n\n
   <p>Becoming literate, then passionate about reading and writing ironically begins for me in a home where literacy flourished, though it was literacy in the traditional sense. My mother was a pattern maker who created master samples of the most intricate item of clothing one could imagine. A seamstress\u2019s apprentice from the age of 8, she made her own clothing by the age of 10, and designed patterns by the time she was a teen. The eye for fashion, design, and beauty filled our home, even though she never read to me, purchased a book or magazine, or encouraged my sister and I to read. Kindergarten through middle school were years inspired by the literacies my mother knew intricately\u2013creating a beautiful garment from scratch, revising it according to the precise measurements of one\u2019s body and taste, customizing every last detail with precision and love. This precision transferred into the beautiful meals she cultivated for our small family each evening\u2014always a \u201cprimo piatto\u201d and \u201csecondo,\u201d per our Southern Italian culture. Meals filled with pastas of every shape and size, colorful vegetables, legumes, meats and fishes were seasoned generously with basil, oregano, olive oil and always love. I did not realize it then, but I was learning literacy\u2013 precision and power of rhetorical objects\u2013albeit, in a non-traditional way.&nbsp;<\/p>\n\n\n\n
   <p>My high school years exposed me to the great white masters of the canon (before DEI and POCs were rightfully considered, and belatedly included into my conservative, catholic high school\u2019s curriculum). Of the many writers we read, Jane Austen\u2019s stories transported my adolescent imagination, illustrating that my strict upbringing was not my experience alone. I dreamed I\u2019d find a devoted suitor like Darcy of <em>Pride and Prejudice<\/em>, but aspired more to Jo March\u2019s smart, independent character in <em>Little Women<\/em>, than that of the docile, too-tolerant Elizabeth Bennet.&nbsp;<\/p>\n\n\n\n
   <p>College opened my world to a medley of writers and genres. Emphatic writers like Ayn Rand shocked me with their deterministic world views. I sought other writers whose values might be less individualistic and profit-motivated, and more aligned with those of my family\u2019s slow culture.<\/p>\n\n\n\n
   <p>In my graduate school experiences, the words of Gayl Jones, Gwendolyn Brooks, Zora Neale Hurston, Toni Morrison, Jhumpa Lahiri, Amy Tan, Sonia Cisneros, Julia Alvarez and so many others exploded everything I knew about literature. Here were stories that depicted visceral female experiences that finally resonated with my soul and memory for years after I put them away.&nbsp;<\/p>\n\n\n\n
   <p>These stories led to my own research and discovery of Helen Barolini, <a href=\"https:\/\/www.amazon.com\/stores\/Marianna-De-Marco-Torgovnick\/author\/B000APA9SI?ref=ap_rdr&amp;store_ref=ap_rdr&amp;isDramIntegrated=true&amp;shoppingPortalEnabled=true\">Marianna De Marco Torgovnick<\/a>, Louise DeSalvo, Rita Ciresi, Lisa Scottoline, and so many Italian American women writers I never once encountered in my American \u201ceducation.\u201d&nbsp;<\/p>\n\n\n\n
   <p>Today, the words of Anna Maria Ortese, Elena Ferrante, Alba De C\u00e9spedes, tell stories of my mother\u2019s becoming, her mother\u2019s, and my own, mixed with those of Octavia Butler, Jacqueline Woodson, Mariama B\u00e2. I look for these writers. They have been referred to me by friends, colleagues, students, my children, my mentees, and often, my sister. Their stories fill me. They overwhelm me. I know so very little, and have so much more to learn, so much more living, writing, and becoming to do.&nbsp;&nbsp;<\/p>\n\n\n\n
   <p><strong>Fiona<\/strong><\/p>\n\n\n\n
   <p>Writing has always been an important part of my life. When I was little, I had a love for reading which sparked my interest to want to write. And that started when every night my mother and I would read books like Amelia Bedelia and Junie B. Jones. Those characters brought humor into my life but it also made me realize how writing can show various characters coming from all sorts of challenges and struggles in life. It showed me that anyone can write about their experiences. I felt inspired to write experiences of my life and create a journal for myself. I turned to writing during my happiest and darkest days.&nbsp;<\/p>\n\n\n\n
   <p>
      But what really motivated me to eventually write a memoir about my life was Maya Aneglou\u2019s <em>I Know Why the Caged Bird Sings<\/em>. Her book was so inspiring to me because it made me realize that I wanted to write a story about the good times I experienced, the obstacles I\u2019ve faced and what I\u2019ve learned along the way. And as an aspiring journalist, I want to write not only my own personal stories but about how people\u2019s life experiences shaped them into the people that they are today.&nbsp;<\/p>\n\n\n\n
      <figure class=\"wp-block-pullquote\">
   <blockquote>
   <p>I felt inspired to write experiences of my life and create a journal for myself. I turned to writing during my happiest and darkest days.<\/p><\/blockquote><\/figure>\n\n\n\n
   <p>Memoirs are now my favorite genre and I\u2019ve enjoyed reading memoirs from female writers. <em>Girlhood<\/em> by Melissa Febos,&nbsp; <em>AfterShocks <\/em>by Nadia Owusu, and Joyce Carol Oates\u2019 memoir, <em>A Widow\u2019s Story<\/em> inspired me to write and learn how storytelling is such an important and powerful tool to glimpse into someone else\u2019s life.&nbsp;<\/p>\n\n\n\n
   <p>And most of all, my mentor Cristina inspires me everyday to continue writing. I\u2019ve learned so much from her and how I can improve my writing skills and eventually pursue my passion for journalism. Without these strong female writers and mentors, I don\u2019t think I would have the inspiration to do what I love the most.&nbsp;<\/p>\n\n\n\n
`;

  return (
    <SafeAreaView style={tempStyles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView
          bounces
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
        >
          <Image style={tempStyles.image} source={{ uri: image }} />

          <Text style={tempStyles.title}>{title}</Text>
          <RenderHTML
            source={{ html }}
            baseStyle={{
              fontFamily: 'Avenir',
              fontSize: 12,
              fontWeight: '400',
              textAlign: 'left',
              color: 'black',
              marginBottom: 16,
            }}
          />

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

            <Button
              textColor="black"
              buttonColor="#D9D9D9"
              icon="share"
              onPress={onShare}
              style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
            >
              <Text style={tempStyles.shareButtonText}>Share Story</Text>
            </Button>
          </View>

          <Text style={tempStyles.heading}>{heading}</Text>

          <Text style={tempStyles.story}>{story}</Text>

          <Button
            textColor="black"
            buttonColor="#D9D9D9"
            icon="share"
            onPress={onShare}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={tempStyles.shareButtonText}>Share Story</Text>
          </Button>

          <Text style={tempStyles.authorProcess}>Author's Process</Text>

          <Text style={tempStyles.process}>{process}</Text>

          <View style={tempStyles.author}>
            <Image style={tempStyles.authorImage} source={{ uri: '' }} />
            <Text style={tempStyles.authorText}>By {author}</Text>
          </View>

          <Button
            textColor="black"
            icon="arrow-up"
            onPress={scrollUp}
            style={{ width: 125, marginBottom: 16, borderRadius: 10 }}
          >
            <Text style={tempStyles.backToTopButtonText}>Back To Top</Text>
          </Button>
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
    marginBottom: 16,
  },
  authorImage: {
    backgroundColor: '#D9D9D9',
    width: 21,
    height: 21,
    borderRadius: 100 / 2,
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  author: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
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
    marginBottom: 16,
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
    backgroundColor: '#D9D9D9',
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
    marginBottom: 16,
  },
  authorProcess: {
    fontFamily: 'Avenir',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  process: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
  backToTopButtonText: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'left',
    color: 'black',
  },
});

const htmlStyles = StyleSheet.create({
  story: {
    fontFamily: 'Avenir',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: 'black',
    marginBottom: 16,
  },
});
