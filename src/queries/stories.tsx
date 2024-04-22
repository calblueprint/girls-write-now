import { Story, StoryPreview, StoryCard } from './types';
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
    return data;
  }
}

export async function fetchFeaturedStoryPreviews(): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_featured_story_previews');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch featured story previews: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchFeaturedStoriesDescription(): Promise<string> {
  const { data, error } = await supabase
    .from('featured_stories')
    .select('description');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch featured story description: ${error}`,
    );
  } else {
    return data[0].description;
  }
}

export async function fetchRecommendedStories(): Promise<StoryCard[]> {
  const { data, error } = await supabase.rpc('fetch_recommended_stories');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch recommended stories: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchNewStories(): Promise<StoryCard[]> {
  const { data, error } = await supabase.rpc('fetch_new_stories');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch new stories: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchStoryPreviewById(
  storyId: number,
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('curr_story_preview_by_id', {
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

export async function fetchStoryPreviewByIds(
  storyIds: number[],
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('curr_story_preview_by_ids', {
    input_ids: storyIds,
  });
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch story preview by IDs: ${error}`,
    );
  } else {
    return data;
  }
}

export async function fetchFeaturedStoriesDescriptionHeader(): Promise<string> {
  const { data, error } = await supabase
    .from('featured_stories_description')
    .select('header');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch featured story description: ${error}`,
    );
  } else {
    return data[0].header;
  }
}

export async function fetchFeaturedStoriesDescriptionDescription(): Promise<string> {
  const { data, error } = await supabase
    .from('featured_stories_description')
    .select('description');

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch featured story description: ${error}`,
    );
  } else {
    return data[0].description;
  }
}
