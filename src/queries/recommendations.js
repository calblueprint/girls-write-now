import { pipeline, env } from '@xenova/transformers';
import supabase from '../utils/supabase.ts';

// Configuration for Deno runtime
env.useBrowserCache = false;

const pipe = async () => {
  await pipeline('feature-extraction', 'Supabase/gte-small');
};

// Generate the embedding from the user input
const generateEmbedding = async text => {
  const output = await pipe(text, {
    pooling: 'mean',
    normalize: true,
  });

  // Extract the embedding output
  return Array.from(output.data);
};

const getStories = () => {
  return supabase.from('stories').select('*').is('embedding', null);
};

const addStoryEmbedding = async story => {
  const embedding = await generateEmbedding(story.title);
  await supabase.from('stories').update({ embedding }).eq('id', story.id);
  console.log('Generated embeddings for story: ', story.id);
};

const processAllStories = async () => {
  const { data: stories } = await getStories();

  if (!stories?.length) {
    return;
  }
  await Promise.all(stories.map(story => addStoryEmbedding(story)));
  processAllStories();
};

processAllStories();
