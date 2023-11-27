import { Genre } from './types';
import supabase from '../utils/supabase';

export async function fetchGenres(): Promise<Genre[]> {
  const { data, error } = await supabase.rpc('fetch_subgenres');
  console.log('TESTING SUPABASE QUERY OUTPUT:', data);
  if (error) {
    throw new Error(
      `An error occured when trying to fetch all author story previews: ${error}`,
    );
  } else {
    return data;
  }
}
