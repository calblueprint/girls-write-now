import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';
import Emoji from 'react-native-emoji';
import { addReactionToStory } from '../../queries/reactions';
import { useSession } from '../../utils/AuthContext';

type ReactionPickerProps = {
  storyId: number
}

const ReactionPicker = ({ storyId }: ReactionPickerProps) => {
  const { user } = useSession();
  const [showReactions, setShowReactions] = useState(false);
  const toggleReactions = () => setShowReactions(!showReactions);
  const reactionMapping: Record<string, number> = { "heart": 2, "clap": 3, "muscle": 4, "cry": 5, "hugging_face": 6 };

  const addReaction = (reactionName: string) => {
    const reactionId = reactionMapping[reactionName];
    addReactionToStory(user?.id, storyId, reactionId);
  }

  return (
    <TouchableOpacity style={styles.reactionView} onPress={toggleReactions}>
      <View style={styles.reactionsContainer}>
        <FontAwesomeIcon icon={faFaceSmile} size={15} color="#ffffff" />

        {showReactions && (
          <>
            <View style={{ marginLeft: 12 }} />
            {Object.keys(reactionMapping).map((reaction, i) => (
              <TouchableOpacity key={i} onPress={() => addReaction(reaction)}>
                <Emoji name={reaction} />
              </TouchableOpacity>
            )
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ReactionPicker;
