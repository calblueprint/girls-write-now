import { Text, View } from 'react-native';
import styles from './styles';
import Emoji from 'react-native-emoji';
import globalStyles from '../../styles/globalStyles';
import { Channel, usePubSub } from '../../utils/PubSubContext';
import { useEffect, useState } from 'react';

type ReactionDisplayProps = {
  reactions: (string | null)[];
  storyId: number;
};

const reactionColors: Record<string, string> = {
  heart: '#FFCCCB',
  clap: '#FFD580',
  cry: '#89CFF0',
  hugging_face: '#ffc3bf',
  muscle: '#eddcf7',
};

function ReactionDisplay({ reactions, storyId }: ReactionDisplayProps) {
  const { subscribe, getPubSubValue } = usePubSub()
  const [reactionCount, setReactionCount] = useState(0);

  const cleanedReactions = reactions.filter(reaction => reaction != null);
  const defaultColor = reactionColors['heart'];
  const setOfReactions = [...cleanedReactions];
  setOfReactions.push('heart');
  setOfReactions.push('clap');
  setOfReactions.push('muscle');

  const reactionDisplay = [...new Set(setOfReactions)].slice(0, 3);
  const serverReactionCount = cleanedReactions?.length ?? 0;

  useEffect(() => {
    setReactionCount(serverReactionCount);
  }, [])

  useEffect(() => {
    const value = getPubSubValue(Channel.REACTIONS, storyId);
    if (value == undefined) {
      return;
    }

    if (value) {
      setReactionCount(serverReactionCount + 1)
    } else {
      setReactionCount(serverReactionCount);
    }
  }, [subscribe(Channel.REACTIONS, storyId)])

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: -7,
      }}
    >
      {reactionDisplay.map(reaction => {
        if (reaction == null) return;

        return (
          <View
            key={reaction}
            style={[
              styles.reactions,
              {
                backgroundColor:
                  reaction in reactionColors
                    ? reactionColors[reaction]
                    : defaultColor,
              },
            ]}
          >
            <Emoji name={reaction} />
          </View>
        );
      })}
      <View style={styles.reactionNumber}>
        <Text style={[globalStyles.subtext, styles.reactionText]}>
          {reactionCount}
        </Text>
      </View>
    </View>
  );
}

export default ReactionDisplay;
