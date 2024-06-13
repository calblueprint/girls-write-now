import supabase from '../utils/supabase';

export const isEmailUsed = async (email: string) => {
  const { count } = await supabase
    .from('profiles')
    .select(`*`, { count: 'exact' })
    .eq('email', email);

  return count !== 0;
};

export const queryEmailByUsername = async (username: string) => {
  return await supabase
    .from('profiles')
    .select(`email`)
    .limit(1)
    .eq('username', username);
};

export const deleteUser = async (uuid: string) => {
  let { data, error } = await supabase.rpc('delete_user', {
    uuid,
  });
  if (error) console.error(error);
  else console.log(data);
};
