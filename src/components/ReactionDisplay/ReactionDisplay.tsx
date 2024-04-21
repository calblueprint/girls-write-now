import { Text, View } from 'react-native';
import styles from './styles';
import Emoji from 'react-native-emoji';
import globalStyles from '../../styles/globalStyles';

type ReactionDisplayProps = {
  reactions: string[];
};

function ReactionDisplay({ reactions }: ReactionDisplayProps) {
  const reactionColors: Record<string, string> = {
    heart: '#FFCCCB',
    clap: '#FFD580',
    cry: '#89CFF0',
    hugging_face: '#ffc3bf',
    muscle: '#eddcf7',
  };
  const defaultColor = reactionColors['heart'];
  const setOfReactions = [...reactions];
  setOfReactions.push('heart');
  setOfReactions.push('clap');
  setOfReactions.push('muscle');

  const reactionDisplay = [...new Set(setOfReactions)].slice(0, 3);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: -7,
      }}
    >
      {reactionDisplay.map(reaction => {
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
          {reactions?.length ?? 0}
        </Text>
      </View>
    </View>
  );
}

export default ReactionDisplay;
