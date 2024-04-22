import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import styles from './styles';
import Emoji from 'react-native-emoji';

const ReactionPicker = () => {
  const [showReactions, setShowReactions] = useState(false);

  const toggleReactions = () => setShowReactions(!showReactions);

  // Dummy onPress functions
  const onClapPress = () => console.log('Smile pressed');
  const onHeartPress = () => console.log('Heart pressed');
  const onMusclePress = () => console.log('Thumbs up pressed');
  const onCryPress = () => console.log('Laugh pressed');
  const onHuggingFacePress = () => console.log('Laugh pressed');

  // <View style={styles.container}>
  return (
    <TouchableOpacity style={styles.reactionView} onPress={toggleReactions}>
      <View style={styles.reactionsContainer}>
        <FontAwesomeIcon icon={faFaceSmile} size={15} color="#ffffff" />

        {showReactions && (
          <>
            <View style={{ marginLeft: 12 }} />
            <TouchableOpacity onPress={onHeartPress}>
              <Emoji name="heart" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClapPress}>
              <Emoji name="clap" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onMusclePress}>
              <Emoji name="muscle" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCryPress}>
              <Emoji name="cry" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onHuggingFacePress}>
              <Emoji name="hugging_face" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReactionPicker;
