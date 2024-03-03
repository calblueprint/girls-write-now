import supabase from '../utils/supabase';

export async function fetchUserStories(
  user_id: string | undefined,
  name: string | undefined,
) {
  const { data, error } = await supabase
    .from('Saved Stories')
    .select('story_id')
    .eq('user_id', user_id)
    .eq('name', name);

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
  fetchUserStories(user_id, 'favorites');
}

export async function fetchUserStoriesReadingList(user_id: string | undefined) {
  fetchUserStories(user_id, 'reading list');
}

export async function setUserStories(
  user_id: string | undefined,
  story_id: number,
  name: string,
) {
  const { data, error } = await supabase
    .from('Saved Stories')
    .insert([{ user_id: user_id, story_id: story_id, name: name }])
    .select();

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to set user saved stories: ${error.details}`,
    );
  }
}

export async function setUserStoriesFavorites(
  user_id: string | undefined,
  story_id: number,
) {
  setUserStories(user_id, story_id, 'favorites');
}

export async function setUserStoriesReadingList(
  user_id: string | undefined,
  story_id: number,
) {
  setUserStories(user_id, story_id, 'reading list');
}
