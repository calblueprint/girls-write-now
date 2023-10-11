import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import styles from './styles';

type SearchCardProps = {
  title: string;
  author: string;
  image: string;
  authorImage: string;
  tags: string[];
  pressFunction: (event: GestureResponderEvent) => void;
};

function SearchCard({
  title,
  author,
  image,
  authorImage,
  tags,
  pressFunction,
}: SearchCardProps) {
  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.card}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.authorContainer}>
            <Image style={styles.authorImage} source={{ uri: authorImage }} />
            <Text style={styles.author}>{author}</Text>
          </View>
          <View style={styles.tagsContainer}>
            {tags.map(tag => (
              <Text key={tag} style={styles.tag}>
                {tag}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default SearchCard;
