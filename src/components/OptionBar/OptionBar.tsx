import { Share } from 'react-native';
import Icon from '../../../assets/icons';
import { View } from 'react-native';
import ReactionPicker from '../ReactionPicker/ReactionPicker';
import SaveStoryButton from '../SaveStoryButton/SaveStoryButton';
import FavoriteStoryButton from '../FavoriteStoryButton/FavoriteStoryButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import { Story } from '../../queries/types';

type OptionBarProps = {
  storyId: number;
  story: Story;
};

function OptionBar({ storyId, story }: OptionBarProps) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this story from Girls Write Now! \n${story.link}/`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.options}>
      <ReactionPicker storyId={storyId} />

      <View style={styles.right}>
        <SaveStoryButton storyId={storyId} />
        <FavoriteStoryButton storyId={storyId} />
        <TouchableOpacity onPress={onShare}>
          <Icon type="share_outline" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default OptionBar;
