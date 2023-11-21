import { GestureResponderEvent, Pressable, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

type RecentSearchCardProps = {
  value: string;
  numResults: number;
  pressFunction: (event: GestureResponderEvent) => void;
};

function RecentSearchCard({
  value,
  numResults,
  pressFunction,
}: RecentSearchCardProps) {
  return (
    <Pressable onPress={pressFunction}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Icon name="search1" size={18} color="#A7A5A5" />
          <Text>{value}</Text>
          <Text>{numResults} Results</Text>
          <Icon name="caretright" size={18} color="black" />
        </View>
      </View>
    </Pressable>
  );
}

export default RecentSearchCard;
