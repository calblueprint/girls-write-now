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

type LandingCardProps = {
  genre_medium: string;
  image: string;
  id: number; //story ID to send for routing
  pressFunction: (event: GestureResponderEvent) => void;
};

function LandingCard({ genre_medium, id, pressFunction }: LandingCardProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.contentCardContainer}>
        <View style={styles.card} />
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayText}>{genre_medium}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default LandingCard;

//landing scroll will pass a color prop into the landingcard component?
