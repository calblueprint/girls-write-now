import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type ContentCardProps = {
  title: string;
  author: string;
  image: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function ContentCard({
  title,
  author,
  image,
  pressFunction,
}: ContentCardProps) {
  const saveStory = () => {
    console.log("testing '+' icon does something for story " + title);
  };

  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.contentCard}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.image} source={{ uri: image }} />
          {/* <View style={styles.authors}>
            <Image
              style={styles.reactions}
              source={require('./savedStoriesIcon.png')}
            />
            <Image
              style={styles.reactions}
              source={require('./savedStoriesIcon.png')}
            />
            <Image
              style={styles.reactions}
              source={require('./savedStoriesIcon.png')}
            />
          </View> */}
        </View>

        <View style={styles.textContainer}>
          <Text style={[globalStyles.h3, styles.title]} numberOfLines={1}>
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={globalStyles.subtext} numberOfLines={1}>
              By{'  '}
            </Text>
            <Text style={globalStyles.subHeading1} numberOfLines={1}>
              {author}
            </Text>
          </View>
          <View style={styles.buttons}>
            <View>
              <TouchableOpacity
                onPress={() => null}
                style={{ flexDirection: 'row' }}
              >
                <Image
                  style={styles.reactions}
                  source={require('./savedStoriesIcon.png')}
                />
                <Image
                  style={styles.reactions}
                  source={require('./savedStoriesIcon.png')}
                />
                <Image
                  style={styles.reactions}
                  source={require('./savedStoriesIcon.png')}
                />
                <View style={styles.reactionNumber}>
                  <Text style={globalStyles.subtext}>
                    14{/*change number to work*/}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => saveStory()}>
              <Image
                style={{ width: 40, height: 40 }}
                source={require('./savedStoriesIcon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ContentCard;
