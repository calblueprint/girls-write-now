import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import {
  addUserStoryToReadingList,
  deleteUserStoryToReadingList,
  isStoryInReadingList,
} from '../../queries/savedStories';
import { Channel, usePubSub } from '../../utils/PubSubContext';
import { useSession } from '../../utils/AuthContext';
import { Alert, View } from 'react-native';

type SaveStoryButtonProps = {
  storyId: number;
  defaultState?: boolean | null;
};

/*
 * Keeps state of a story's saved story button.
 * Changes the icon of the component based on whether the story is saved or not.
 * Updates live based on the PubSubContext
 */
export default function SaveStoryButton({
  storyId,
  defaultState = null,
}: SaveStoryButtonProps) {
  const { user, guest } = useSession();
  const [storyIsSaved, setStoryIsSaved] = useState<boolean | null>(
    defaultState,
  );
  const { publish, channels, getPubSubValue } = usePubSub();

  useEffect(() => {
    if (guest) return;
    if (defaultState != null) {
      return;
    }

    isStoryInReadingList(storyId, user?.id).then(storyInReadingList => {
      setStoryIsSaved(storyInReadingList);
    });
  }, [storyId]);

  useEffect(() => {
    if (guest) return;

    if (getPubSubValue(Channel.SAVED_STORIES, storyId) != null) {
      setStoryIsSaved(getPubSubValue(Channel.SAVED_STORIES, storyId) ?? false);
    }
  }, [channels[Channel.SAVED_STORIES][storyId]]);

  const saveStory = async (saved: boolean) => {
    setStoryIsSaved(saved);
    publish(Channel.SAVED_STORIES, storyId, saved); // update other cards with this story

    if (saved) {
      await addUserStoryToReadingList(user?.id, storyId);
    } else {
      await deleteUserStoryToReadingList(user?.id, storyId);
    }
  };

  const renderSavedStoryImage = useMemo(() => {
    return (
      <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <Path
          d="M4.375 19.375V18.125H13.125V19.375H4.375ZM4.375 14.375V13.125H18.125V14.375H4.375ZM4.375 9.375V8.125H18.125V9.375H4.375ZM20.4375 22.885L16.865 19.3125L17.75 18.4275L20.4375 21.1013L25.75 15.7887L26.635 16.6875L20.4375 22.885Z"
          fill="#703929"
        />
      </Svg>
    );
  }, []);

  const renderSaveStoryImage = useMemo(() => {
    return (
      <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <Path
          d="M4.375 19.375V18.125H13.125V19.375H4.375ZM4.375 14.375V13.125H18.125V14.375H4.375ZM4.375 9.375V8.125H18.125V9.375H4.375ZM20.625 24.375V19.375H15.625V18.125H20.625V13.125H21.875V18.125H26.875V19.375H21.875V24.375H20.625Z"
          fill="black"
        />
      </Svg>
    );
  }, []);

  if (guest) {
    return (
      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            'You are not signed in',
            'Create an account to save stories to your library.',
          )
        }
      >
        {renderSaveStoryImage}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={() => saveStory(!storyIsSaved)}>
      {storyIsSaved ? renderSavedStoryImage : renderSaveStoryImage}
    </TouchableOpacity>
  );
}
