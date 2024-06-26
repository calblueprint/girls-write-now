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

export async function isPasswordSameAsBefore(
  new_plain_password: string,
  user_id: string | undefined,
): Promise<boolean> {
  let { data, error } = await supabase.rpc('check_same_as_old_pass', {
    new_plain_password,
    user_id,
  });

  if (error) {
    console.error(error);
    return false;
  } else {
    return data;
  }
}
