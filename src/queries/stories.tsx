import { Story, StoryPreview } from './types';
import supabase from '../utils/supabase';

export async function fetchAllStoryPreviews(): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_all_story_previews');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch all story previews: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchStory(storyId: number): Promise<Story[]> {
  const { data, error } = await supabase.rpc('fetch_story', {
    input_id: storyId,
  });

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch story ${storyId}: ${error.code}`,
    );
  } else {
    console.log(data);
    return data;
  }
}
