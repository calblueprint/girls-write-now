// eslint-disable-next-line import/namespace
import { Genre } from './types';
import { GenreStories } from './types';
import supabase from '../utils/supabase';

export async function fetchGenres(): Promise<Genre[]> {
  const { data, error } = await supabase.rpc('fetch_subgenres');
  if (error) {
    throw new Error(
      `An error occured when trying to fetch all genres ${error}`,
    );
  } else {
    return data;
  }
}

//will return a list of story Ids that match the parent genre ID and subgenre IDs
export async function fetchGenreStoryPreviews(
  parent_id: number,
): Promise<GenreStories> {
  const { data, error } = await supabase.rpc('fetch_genre_stories', {
    genre_parent_id: parent_id,
  });
  if (error) {
    throw new Error(
      `An error occured when trying to fetch all genres story previews ${error}`,
    );
  } else {
    return data;
  }
}
