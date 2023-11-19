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
  subgenres: string;
  cardColor: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function LandingCard({
  subgenres,
  pressFunction,
  cardColor,
}: LandingCardProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={styles.contentCardContainer}>
        <View style={[styles.card, { backgroundColor: cardColor }]} />
        <View style={styles.overlayContainer}>
          <Text style={styles.overlayText}>{subgenres}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default LandingCard;

//landing scroll will pass a color prop into the landingcard component?
