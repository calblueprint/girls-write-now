import supabase from '../utils/supabase';

export async function fetchUsername(user_id: string | undefined) {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', user_id);

  if (error) {
    console.log(error);
    throw new Error(`An error occured when trying to fetch username: ${error}`);
  } else {
    return data[0].username as string;
  }
}
