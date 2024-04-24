import { Reactions } from './types';
import supabase from '../utils/supabase';

export async function addReactionToStory(
  input_profile_id: string | undefined,
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
  input_profile_id: string | undefined,
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

export async function fetchAllReactionsToStory(
  storyId: number,
): Promise<string[]> {
  const { data, error } = await supabase.rpc('curr_get_reactions_for_story', {
    story_id: storyId,
  });

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch reactions to a story', ${error}`,
    );
  } else {
    return data.reactions;
  }
}

export async function fetchReactionsToStoryByUser(
  story_id: number,
  profile_id: number,
): Promise<Reactions[]> {
  const { data, error } = await supabase.rpc(
    'get_reactions_for_user_and_story',
    {
      _story_id: story_id,
      _profile_id: profile_id,
    },
  );
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch reactions for user and story ${error}`,
    );
  } else {
    return data;
  }
}
