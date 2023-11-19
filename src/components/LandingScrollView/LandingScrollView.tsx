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
  main_genre: string;
  subgenres: string;
  cardColor: string;
  pressFunction: (event: GestureResponderEvent) => void;

  landing_card: typeof LandingCard;
};

//landing scroll should have a see all button and title for genre
function ContentCard({
  main_genre,
  landing_card,
  subgenres,
  cardColor,
  pressFunction,
}: ContentCardProps) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.genreText}> {main_genre}</Text>
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

// type LandingCardProps = {
//   subgenres: string;
//   cardColor: string;
//   pressFunction: (event: GestureResponderEvent) => void;
// };
