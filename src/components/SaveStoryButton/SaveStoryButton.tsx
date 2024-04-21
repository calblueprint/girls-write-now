import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import {
  addUserStoryToReadingList,
  deleteUserStoryToReadingList,
  isStoryInReadingList,
} from '../../queries/savedStories';
import { useSession } from '../../utils/AuthContext';
import { usePubSub } from '../../utils/PubSubContext';

type SaveStoryButtonProps = {
  storyId: number;
};

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
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <Path
            d="M4.375 19.375V18.125H13.125V19.375H4.375ZM4.375 14.375V13.125H18.125V14.375H4.375ZM4.375 9.375V8.125H18.125V9.375H4.375ZM20.4375 22.885L16.865 19.3125L17.75 18.4275L20.4375 21.1013L25.75 15.7887L26.635 16.6875L20.4375 22.885Z"
            fill="#703929"
          />
        </Svg>
      ) : (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <Path
            d="M4.375 19.375V18.125H13.125V19.375H4.375ZM4.375 14.375V13.125H18.125V14.375H4.375ZM4.375 9.375V8.125H18.125V9.375H4.375ZM20.625 24.375V19.375H15.625V18.125H20.625V13.125H21.875V18.125H26.875V19.375H21.875V24.375H20.625Z"
            fill="black"
          />
        </Svg>
      )}
    </TouchableOpacity>
  );
}
