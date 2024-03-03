import { Story } from './types';
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
  return fetchUserStories(user_id, 'favorites');
}

export async function fetchUserStoriesReadingList(user_id: string | undefined) {
  return fetchUserStories(user_id, 'reading_list');
}
