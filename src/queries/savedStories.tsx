import supabase from '../utils/supabase';

const favorites = 'favorites';
const readingList = 'reading list';

export async function fetchUserStories(
  user_id: string | undefined,
  name: string | undefined,
) {
  const { data, error } = await supabase
    .from('saved_stories')
    .select('story_id')
    .eq('user_id', user_id)
    .eq('name', name);

  // TODO remove throw error in production
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch user saved stories: ${error.details}`,
    );
  } else {
    return data[0].story_id;
  }
}

export async function fetchUserStoriesFavorites(user_id: string | undefined) {
  fetchUserStories(user_id, favorites);
}

export async function fetchUserStoriesReadingList(user_id: string | undefined) {
  fetchUserStories(user_id, readingList);
}

export async function addUserStory(
  user_id: string | undefined,
  story_id: number,
  name: string,
) {
  const { data, error } = await supabase
    .from('saved_stories')
    .insert([{ user_id: user_id, story_id: story_id, name: name }])
    .select();

  // TODO remove throw error in production
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to set user saved stories: ${error.details}`,
    );
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

  // TODO remove throw error in production
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to delete user saved stories: ${error.details}`,
    );
  }
}
