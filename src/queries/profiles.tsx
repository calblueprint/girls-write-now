import supabase from '../utils/supabase';

export async function fetchUsername(user_id: string | undefined) {
  const { data, error } = await supabase
    .from('profiles')
    .select('username')
    .eq('user_id', user_id);

  if (error) {
    console.log(error);
    throw new Error(
      `An error occured when trying to fetch username: ${error.details}`,
    );
  } else {
    return data[0].username as string;
  }
}

export async function isEmailTaken(newEmail: string) {
  const { count } = await supabase
    .from('profiles')
    .select(`*`, { count: 'exact' })
    .limit(1)
    .eq('email', newEmail);
  const emailIsTaken = (count ?? 0) >= 1;
  return emailIsTaken as boolean;
}
