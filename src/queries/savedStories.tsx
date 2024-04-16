import supabase from '../utils/supabase';

enum SavedList {
  FAVORITES = 'favorites',
  READING_LIST = 'reading list'
}


async function fetchUserStories(
  user_id: string | undefined,
  name: string | undefined,
) {
  const { data: storyObjects, error } = await supabase
    .from('saved_stories')
    .select('story_id')
    .eq('user_id', user_id)
    .eq('name', name);

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `An error occured when trying to fetch user saved stories: ${JSON.stringify(
          error,
        )}`,
      );
    }
    return [];
  }

  let storyData = [];
  for (const storyObject of storyObjects) {
    const storyId = storyObject['story_id'];
    const { data, error } = await supabase.rpc('fetch_story', {
      input_id: storyId,
    });

    if (error || data.length == 0) {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          `An error occured when trying to use rpc to get story data: ${JSON.stringify(
            error,
          )}`,
        );
      }
    } else {
      storyData.push(data[0]);
    }
  }

  return storyData;
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
    .insert([{ user_id: user_id, story_id: story_id, name: name }])
    .select();

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `An error occured when trying to set user saved stories: ${error.details}`,
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

export async function isStoryInReadingList(storyId: number, userId: string | undefined): Promise<boolean> {
  let { data, error } = await supabase
    .rpc('is_story_saved_for_user', {
      list_name: "reading list",
      story_db_id: storyId,
      user_uuid: userId,
    })

  if (error) {
    console.error(error)
    return false;
  }

  return data;
}
