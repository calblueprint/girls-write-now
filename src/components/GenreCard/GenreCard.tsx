import {
  GestureResponderEvent,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type GenreCardProps = {
  subgenres: string;
  subgenre_id: number;
  cardColor: string;
  pressFunction: (event: GestureResponderEvent) => void;
};

function GenreCard({ subgenres, pressFunction, cardColor }: GenreCardProps) {
  return (
    <TouchableOpacity onPress={pressFunction}>
      <View style={[styles.card, { backgroundColor: cardColor }]}>
        <Text style={[globalStyles.subHeading1, styles.overlayText]}>
          {subgenres}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default GenreCard;
