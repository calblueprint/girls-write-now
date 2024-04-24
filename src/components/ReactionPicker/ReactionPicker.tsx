import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import styles from './styles';
import Emoji from 'react-native-emoji';
import { addReactionToStory, deleteReactionToStory } from '../../queries/reactions';
import { useSession } from '../../utils/AuthContext';
import { Channel, REACTION_CHANNEL_OFFSET, usePubSub } from '../../utils/PubSubContext';

type ReactionPickerProps = {
  storyId: number
}

const ReactionPicker = ({ storyId }: ReactionPickerProps) => {
  const { user } = useSession();
  const { publish } = usePubSub()
  const [showReactions, setShowReactions] = useState(false);
  const [currentReaction, setCurrentReaction] = useState('')

  const toggleReactions = () => setShowReactions(!showReactions);
  const reactionMapping: Record<string, number> = { "heart": 2, "clap": 3, "muscle": 4, "cry": 5, "hugging_face": 6 };

  const handleReactionPress = (reactionName: string) => {
    if (currentReaction == reactionName) {
      removeReaction(reactionName);
    } else {
      addReaction(reactionName);
    }
  }

  const addReaction = (reactionName: string) => {
    setCurrentReaction(reactionName);
    publish(Channel.REACTIONS, storyId, true);

    const reactionId = reactionMapping[reactionName];
    addReactionToStory(user?.id, storyId, reactionId);
  }

  const removeReaction = (reactionName: string) => {
    setCurrentReaction("");
    publish(Channel.REACTIONS, storyId, false);

    const reactionId = reactionMapping[reactionName];
    deleteReactionToStory(user?.id, storyId, reactionId);
  }

  return (
    <TouchableOpacity style={styles.reactionView} onPress={toggleReactions}>
      <View style={styles.reactionsContainer}>
        <FontAwesomeIcon icon={faFaceSmile} size={15} color="#ffffff" />

        {showReactions && (
          <>
            <View style={{ marginLeft: 12 }} />
            {Object.keys(reactionMapping).map((reaction, i) => (
              <TouchableOpacity key={i} onPress={() => handleReactionPress(reaction)}>
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
