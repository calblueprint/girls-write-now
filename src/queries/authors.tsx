import { Author, StoryPreview } from './types';
import supabase from '../utils/supabase';

export async function fetchAuthor(authorID: number): Promise<Author> {
  const { data, error } = await supabase
    .from('authors')
    .select('*')
    .eq('id', authorID);
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch author information:' ${error}`,
    );
  } else {
    return data[0] as unknown as Author;
  }
}

export async function fetchAuthorStoryPreviews(
  author_id: number,
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc('fetch_author_story_previews', {
    input_author_id: author_id,
  });
  if (error) {
    throw new Error(
      `An error occured when trying to fetch all author story previews: ${error}`,
    );
  } else {
    return data;
  }
}
