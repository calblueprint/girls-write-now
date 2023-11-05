import { AuthorInfo, StoryPreview } from './types';
import supabase from '../utils/supabase';

export async function fetchAuthor(authorID: number): Promise<AuthorInfo> {
  const { data, error } = await supabase
    .from('authors')
    .select()
    .eq('id', authorID);
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch author information:' ${error}`,
    );
  } else {
    return data; //TODO: figure out why this is returning any[] instead of the AuthorInfo Interface
  }
}

export async function fetchAllAuthorStoryPreviews(
  input_author_id: number,
): Promise<StoryPreview[]> {
  const { data, error } = await supabase.rpc(
    'fetch_author_story',
    input_author_id,
  );
  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch all author story previews: ${error}`,
    );
  } else {
    return data;
  }
}
