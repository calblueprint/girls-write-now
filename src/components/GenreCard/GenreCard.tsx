import {
  GestureResponderEvent,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';

type GenreCardProps = {
  subgenres: string;
  cardColor: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function GenreCard({ subgenres, pressFunction, cardColor }: GenreCardProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={styles.overlayText}>{subgenres}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default GenreCard;
