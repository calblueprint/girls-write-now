import { Reactions } from './types';
import supabase from '../utils/supabase';

export async function addReactionToStory(
  input_profile_id: number,
  input_story_id: number,
  input_reaction_id: number,
): Promise<void> {
  const { data, error } = await supabase.rpc('add_reaction_to_story', {
    story_id: input_story_id,
    profile_id: input_profile_id,
    reaction_id: input_reaction_id,
  });
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to insert author reaction to story: ${error}`,
    );
  } else {
    return data;
  }
}

export async function deleteReactionToStory(
  input_profile_id: number,
  input_story_id: number,
  input_reaction_id: number,
): Promise<void> {
  const { data, error } = await supabase.rpc('remove_reaction_from_story', {
    story_id: input_story_id,
    profile_id: input_profile_id,
    reaction_id: input_reaction_id,
  });
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to delete reaction to story by a user: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchStoryPreviewById(
  storyId: number,
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_story_preview_by_id', {
    input_story_id: storyId,
  });
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch story preview by ID: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchStoryPreviewById(
  storyId: number,
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_story_preview_by_id', {
    input_story_id: storyId,
  });
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch story preview by ID: ${error}`,
    );
  } else {
    return data;
  }
}
