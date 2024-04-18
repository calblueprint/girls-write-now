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
};

const saveStoryImage = require('../../../assets/save_story.png');
const savedStoryImage = require('../../../assets/saved_story.png');

export default function SaveStoryButton({ storyId }: SaveStoryButtonProps) {
  const { user } = useSession();
  const [storyIsSaved, setStoryIsSaved] = useState(false);
  const { channels, initializeChannel, publish } = usePubSub();

  useEffect(() => {
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

  useEffect(() => {
    isStoryInReadingList(storyId, user?.id).then(storyInReadingList =>
      setStoryIsSaved(storyInReadingList),
    );
  }, [storyId]);

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
