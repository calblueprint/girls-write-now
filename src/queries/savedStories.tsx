import supabase from '../utils/supabase';
import { StoryPreview } from './types';

enum SavedList {
  FAVORITES = 'favorites',
  READING_LIST = 'reading list',
}

async function fetchUserStories(
  user_id: string | undefined,
  name: string | undefined,
) {
  let { data, error } = await supabase.rpc('get_saved_stories_for_user', {
    user_id_string: user_id,
    saved_list_name: name
  });

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `An error occured when trying to get user saved stories: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }

  // console.log(data[0]);
  // console.log("As preview:");
  // console.log(data[0] as StoryPreview)
  // console.log(data as StoryPreview[]);

  return data as StoryPreview[];
}

export async function fetchUserStoriesFavorites(user_id: string | undefined) {
  return await fetchUserStories(user_id, SavedList.FAVORITES);
}

export async function fetchUserStoriesReadingList(user_id: string | undefined) {
  return await fetchUserStories(user_id, SavedList.READING_LIST);
}

async function addUserStory(
  user_id: string | undefined,
  story_id: number,
  name: string,
) {
  const { error } = await supabase
    .from('saved_stories')
    .upsert([{ user_id: user_id, story_id: story_id, name: name }])
    .select();

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `An error occured when trying to set user saved stories: ${JSON.stringify(
          error,
        )}`,
      );
    }
  }
}

export async function addUserStoryToFavorites(
  user_id: string | undefined,
  story_id: number,
) {
  addUserStory(user_id, story_id, SavedList.FAVORITES);
}

export async function addUserStoryToReadingList(
  user_id: string | undefined,
  story_id: number,
) {
  addUserStory(user_id, story_id, SavedList.READING_LIST);
}

export async function deleteUserStoryToFavorites(
  user_id: string | undefined,
  story_id: number,
) {
  deleteUserStory(user_id, story_id, SavedList.FAVORITES);
}

export async function deleteUserStoryToReadingList(
  user_id: string | undefined,
  story_id: number,
) {
  deleteUserStory(user_id, story_id, SavedList.READING_LIST);
}

export async function deleteUserStory(
  user_id: string | undefined,
  story_id: number,
  name: string,
) {
  const { error } = await supabase
    .from('saved_stories')
    .delete()
    .eq('user_id', user_id)
    .eq('story_id', story_id)
    .eq('name', name);

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `An error occured when trying to delete user saved stories: ${error.details}`,
      );
    }
  }
}

export async function isStoryInReadingList(
  storyId: number,
  userId: string | undefined,
): Promise<boolean> {
  let { data, error } = await supabase.rpc('is_story_saved_for_user', {
    list_name: SavedList.READING_LIST,
    story_db_id: storyId,
    user_uuid: userId,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return data;
}
