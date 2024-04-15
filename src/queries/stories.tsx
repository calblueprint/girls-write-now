import { Story, StoryPreview, StoryCard } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../utils/supabase';
import { useState } from 'react';

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

export async function fetchRecommendedStories(
  recentlyViewed: StoryCard[],
): Promise<StoryCard[]> {
  const recentlyViewedID = recentlyViewed[0].id; //change to take in multiple stories

  const getStoryEmbedding = async () => {
    const { data } = await supabase
      .from('stories')
      .select('embedding')
      .eq('id', recentlyViewedID);

    if (error) {
      console.log(error);
      throw new Error(
        `An error occured when trying to fetch embeddings: ${error.details}`,
      );
    } else {
      if (data) return data[0].embedding as number;
    }
  };

  const embedding = await getStoryEmbedding();

  const { data, error } = await supabase.rpc(
    'fetch_users_recommended_stories',
    {
      query_embedding: embedding,
      match_threshold: 0.0,
      match_count: 5,
    },
  );

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
