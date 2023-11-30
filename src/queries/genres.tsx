// eslint-disable-next-line import/namespace
import { Genre } from './types';
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
