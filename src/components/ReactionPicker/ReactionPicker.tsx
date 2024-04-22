import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';
import globalStyles from '../../styles/globalStyles';

const ReactionPicker = () => {
  const [showReactions, setShowReactions] = useState(false);

  const toggleReactions = () => setShowReactions(!showReactions);

  // Dummy onPress functions
  const onSmilePress = () => console.log('Smile pressed');
  const onHeartPress = () => console.log('Heart pressed');
  const onThumbsUpPress = () => console.log('Thumbs up pressed');
  const onLaughPress = () => console.log('Laugh pressed');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.reactionView} onPress={toggleReactions}>
        <FontAwesomeIcon icon={faFaceSmile} size={15} color="#ffffff" />

        {showReactions && (
          <View style={styles.reactionsContainer}>
            <TouchableOpacity onPress={onHeartPress}>
              <Text>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSmilePress}>
              <Text>🙂</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onThumbsUpPress}>
              <Text>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLaughPress}>
              <Text>😂</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ReactionPicker;
