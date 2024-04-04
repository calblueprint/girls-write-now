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
  authorImage: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function ContentCard({
  title,
  author,
  image,
  authorImage,
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
          <Image
            style={styles.authors}
            source={{
              uri: authorImage
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[globalStyles.subHeading2, styles.title]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={styles.authorSpacing}>
            <Text style={styles.by} numberOfLines={1}>
              By
            </Text>
            <Text style={globalStyles.subtext} numberOfLines={1}>
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
                  <Text style={[globalStyles.subtext, styles.reactionText]}>
                    14{/*change number to work*/}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => saveStory()}>
              <Image
                style={{ width: 30, height: 30 }}
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
