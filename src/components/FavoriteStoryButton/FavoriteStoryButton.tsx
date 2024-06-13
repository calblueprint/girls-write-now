import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Svg, { Path } from 'react-native-svg';

import {
  addUserStoryToFavorites,
  deleteUserStoryToFavorites,
  isStoryInFavorites,
} from '../../queries/savedStories';
import { useSession } from '../../utils/AuthContext';
import { Channel, usePubSub } from '../../utils/PubSubContext';

type FavoriteStoryButtonProps = {
  storyId: number;
};

/*
 * A button that handles the state of the favorite story icon.
 * Automatically updates using PubSubContext based on user interaction.
 * Changes the icon displayed based on if the story is already favorited
 */
export default function FavoriteStoryButton({
  storyId,
}: FavoriteStoryButtonProps) {
  const { user } = useSession();
  const { channels, publish } = usePubSub();
  const [storyIsFavorited, setStoryIsFavorited] = useState(false);

  useEffect(() => {
    isStoryInFavorites(storyId, user?.id).then(storyInReadingList => {
      setStoryIsFavorited(storyInReadingList);
    });
  }, [storyId]);

  useEffect(() => {
    isStoryInFavorites(storyId, user?.id).then(storyInFavorites => {
      setStoryIsFavorited(storyInFavorites);
      publish(Channel.FAVORITES, storyId, storyInFavorites);
    });
  }, [storyId]);

  useEffect(() => {
    const value = channels[Channel.FAVORITES][storyId];
    if (value == undefined) {
      return;
    }

    setStoryIsFavorited(value);
  }, [channels[Channel.FAVORITES][storyId]]);

  const favoriteStory = async (favorited: boolean) => {
    setStoryIsFavorited(favorited);

    if (favorited) {
      publish(Channel.FAVORITES, storyId, true);
      await addUserStoryToFavorites(user?.id, storyId);
    } else {
      publish(Channel.FAVORITES, storyId, false);
      await deleteUserStoryToFavorites(user?.id, storyId);
    }
  };

  const renderFavoritedIcon = useMemo(() => {
    return (
      <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <Path
          d="M15 24.5675L14.0525 23.7113C12.0125 21.8479 10.325 20.2525 8.99 18.925C7.655 17.5983 6.60125 16.4283 5.82875 15.415C5.05708 14.4008 4.5175 13.4837 4.21 12.6637C3.90333 11.8429 3.75 11.0175 3.75 10.1875C3.75 8.5975 4.29 7.2625 5.37 6.1825C6.45 5.1025 7.785 4.5625 9.375 4.5625C10.475 4.5625 11.5063 4.84375 12.4688 5.40625C13.4313 5.96875 14.275 6.78667 15 7.86C15.725 6.78667 16.5687 5.96875 17.5312 5.40625C18.4937 4.84375 19.525 4.5625 20.625 4.5625C22.215 4.5625 23.55 5.1025 24.63 6.1825C25.71 7.2625 26.25 8.5975 26.25 10.1875C26.25 11.0175 26.0967 11.8425 25.79 12.6625C25.4825 13.4833 24.9429 14.4008 24.1712 15.415C23.3987 16.4283 22.3487 17.5983 21.0212 18.925C19.6946 20.2525 18.0029 21.8483 15.9462 23.7125L15 24.5675Z"
          fill="#EB563B"
        />
      </Svg>
    );
  }, []);

  const renderNotFavoritedIcon = useMemo(() => {
    return (
      <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <Path
          d="M15 24.5675L14.0525 23.7113C12.0125 21.8479 10.325 20.2525 8.99 18.925C7.655 17.5983 6.60125 16.4283 5.82875 15.415C5.05708 14.4008 4.5175 13.4837 4.21 12.6637C3.90333 11.8429 3.75 11.0175 3.75 10.1875C3.75 8.5975 4.29 7.2625 5.37 6.1825C6.45 5.1025 7.785 4.5625 9.375 4.5625C10.475 4.5625 11.5063 4.84375 12.4688 5.40625C13.4313 5.96875 14.275 6.78667 15 7.86C15.725 6.78667 16.5687 5.96875 17.5312 5.40625C18.4937 4.84375 19.525 4.5625 20.625 4.5625C22.215 4.5625 23.55 5.1025 24.63 6.1825C25.71 7.2625 26.25 8.5975 26.25 10.1875C26.25 11.0175 26.0967 11.8425 25.79 12.6625C25.4825 13.4833 24.9429 14.4008 24.1712 15.415C23.3987 16.4283 22.3487 17.5983 21.0212 18.925C19.6946 20.2525 18.0029 21.8483 15.9462 23.7125L15 24.5675ZM15 22.875C17 21.0667 18.6458 19.5183 19.9375 18.23C21.2292 16.9408 22.25 15.8221 23 14.8738C23.75 13.9254 24.2708 13.0858 24.5625 12.355C24.8542 11.6233 25 10.9008 25 10.1875C25 8.9375 24.5833 7.89583 23.75 7.0625C22.9167 6.22917 21.875 5.8125 20.625 5.8125C19.63 5.8125 18.7117 6.09667 17.87 6.665C17.0283 7.2325 16.275 8.08792 15.61 9.23125H14.39C13.7083 8.07292 12.9508 7.21333 12.1175 6.6525C11.2842 6.0925 10.37 5.8125 9.375 5.8125C8.14167 5.8125 7.10417 6.22917 6.2625 7.0625C5.42083 7.89583 5 8.9375 5 10.1875C5 10.9008 5.14583 11.6233 5.4375 12.355C5.72917 13.0867 6.25 13.9263 7 14.8738C7.75 15.8213 8.77083 16.9358 10.0625 18.2175C11.3542 19.4992 13 21.0517 15 22.875Z"
          fill="black"
        />
      </Svg>
    );
  }, []);

  return (
    <TouchableOpacity onPress={() => favoriteStory(!storyIsFavorited)}>
      {storyIsFavorited ? renderFavoritedIcon : renderNotFavoritedIcon}
    </TouchableOpacity>
  );
}
