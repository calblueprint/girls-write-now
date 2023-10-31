import { StoryPreview } from './types';
import supabase from '../utils/supabase';

export async function fetchAllStoryPreviews(): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_all_story_previews');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch all story previews: ${error}`,
    );
  } else {
    console.log('Story Preview Data:', data);
    return data;
  }
}
