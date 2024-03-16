import supabase from '../utils/supabase';

const favorites = 'favorites';
const readingList = 'reading list';


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

  let storyData = []
  for (const storyObject of storyObjects) {
    const storyId = storyObject["story_id"];
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
      storyData.push(data[0])
    }
  }

  return storyData;
}

export async function fetchUserStoriesFavorites(user_id: string | undefined) {
  return await fetchUserStories(user_id, favorites);
}

export async function fetchUserStoriesReadingList(user_id: string | undefined) {
  return await fetchUserStories(user_id, readingList);
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
  addUserStory(user_id, story_id, favorites);
}

export async function addUserStoryToReadingList(
  user_id: string | undefined,
  story_id: number,
) {
  addUserStory(user_id, story_id, readingList);
}

export async function deleteUserStories(
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
