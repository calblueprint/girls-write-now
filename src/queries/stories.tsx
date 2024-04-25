import {
  Story,
  StoryPreview,
  StoryCard,
  StoryPreviewWithPreloadedReactions,
} from './types';
import supabase from '../utils/supabase';

export async function fetchAllStoryPreviews(): Promise<
  StoryPreviewWithPreloadedReactions[]
> {
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
    return data as Story[];
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

export async function fetchRecommendedStories(
  inputStories: StoryPreview[],
): Promise<StoryPreview[]> {
  if (inputStories.length === 0) {
    return [];
  }
  const storyIDs = inputStories.map(story => story.id);

  //fill storyIDs with 0's if less than 5 ids
  for (let n = storyIDs.length; n < 5; n++) {
    storyIDs[n] = 0;
  }

  //get embedding vectors for each of the inputs
  const getStoryEmbeddings = async () => {
    const embeddings = inputStories.map(async story => {
      const { data, error } = await supabase
        .from('stories')
        .select('embedding')
        .eq('id', story.id);

      if (error) {
        console.log(error);
        throw new Error(
          `An error occured when trying to fetch embeddings: ${error.details}`,
        );
      } else {
        if (data) {
          return data[0].embedding as string;
        }
      }
    });

    return await Promise.all(embeddings);
  };

  //get embeddings of every story in inputStory
  const embeddingsArray = await getStoryEmbeddings();
  const newEmbeddingsArray = [];
  for (let k = 0; k < embeddingsArray.length; k++) {
    const stringLength = embeddingsArray[k]?.length;
    if (stringLength) {
      const embedding = embeddingsArray[k]?.substring(1, stringLength - 1);
      const formattedEmbedding = embedding?.split(',');
      newEmbeddingsArray[k] = formattedEmbedding;
    }
  }
  const embeddingsLength =
    newEmbeddingsArray.length > 5 ? 5 : newEmbeddingsArray.length;

  //calculate average embedding vector
  const averageEmbedding: number[] = [];
  for (let m = 0; m < 384; m++) {
    averageEmbedding[m] = 0;
  }
  for (let i = 0; i < embeddingsLength; i++) {
    const vector = newEmbeddingsArray[i];
    if (vector) {
      for (let j = 0; j < vector.length; j++) {
        const element = parseFloat(vector[j]);
        averageEmbedding[j] += element / embeddingsLength;
      }
    }
  }

  const { data, error } = await supabase.rpc(
    'fetch_users_recommended_stories',
    {
      query_embedding: averageEmbedding,
      match_threshold: 0.0,
      match_count: 5,
      storyid1: storyIDs[0],
      storyid2: storyIDs[1],
      storyid3: storyIDs[2],
      storyid4: storyIDs[3],
      storyid5: storyIDs[4],
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

export async function fetchFeaturedStoriesHeader(): Promise<string> {
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

export async function fetchFeaturedStoriesDescription(): Promise<string> {
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
