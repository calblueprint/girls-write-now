import { useEffect, useState } from 'react';
import {
  addUserStoryToReadingList,
  deleteUserStoryToReadingList,
  isStoryInReadingList,
} from '../../queries/savedStories';
import { usePubSub } from '../../utils/PubSubContext';
import { useSession } from '../../utils/AuthContext';
import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

type SaveStoryButtonProps = {
  storyId: number;
  defaultState?: boolean | null;
};

const saveStoryImage = require('../../../assets/save_story.png');
const savedStoryImage = require('../../../assets/saved_story.png');

export default function SaveStoryButton({
  storyId,
  defaultState = null,
}: SaveStoryButtonProps) {
  const { user } = useSession();
  const [storyIsSaved, setStoryIsSaved] = useState<boolean | null>(
    defaultState,
  );
  const { channels, initializeChannel, publish } = usePubSub();

  useEffect(() => {
    if (defaultState != null) {
      return;
    }

    isStoryInReadingList(storyId, user?.id).then(storyInReadingList => {
      setStoryIsSaved(storyInReadingList);
      initializeChannel(storyId);
    });
  }, [storyId]);

  useEffect(() => {
    // if another card updates this story, update it here also
    if (typeof channels[storyId] !== 'undefined') {
      setStoryIsSaved(channels[storyId] ?? false);
    }
  }, [channels[storyId]]);

  const saveStory = async (saved: boolean) => {
    setStoryIsSaved(saved);
    publish(storyId, saved); // update other cards with this story

    if (saved) {
      await addUserStoryToReadingList(user?.id, storyId);
    } else {
      await deleteUserStoryToReadingList(user?.id, storyId);
    }
  };

  return (
    <TouchableOpacity onPress={() => saveStory(!storyIsSaved)}>
      {storyIsSaved ? (
        <Image style={{ width: 30, height: 30 }} source={savedStoryImage} />
      ) : (
        <Image style={{ width: 30, height: 30 }} source={saveStoryImage} />
      )}
    </TouchableOpacity>
  );
}