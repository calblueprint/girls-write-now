import { GestureResponderEvent, Pressable, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import globalStyles from '../../styles/globalStyles';
import React from 'react';
import styles from './styles';

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
          <Icon name="search1" size={16} color="#A7A5A5" />
          <Text style={styles.searchValueText}>{value}</Text>
          <Text style={styles.numResultsText}>{numResults} Results</Text>
          <Icon name="caretright" size={12} color="black" />
        </View>
      </View>
    </Pressable>
  );
}

export default RecentSearchCard;
