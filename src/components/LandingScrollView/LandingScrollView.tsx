import {
  GestureResponderEvent,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';
import LandingCard from '../LandingCard/LandingCard';

type ContentCardProps = {
  genre: string;
};

//landing scroll should have a see all button and title for genre
function ContentCard({ genre }: ContentCardProps) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.genreText}> {genre}</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}
      />
    </View>
  );
}

export default ContentCard;
