import { supabase } from '@/integrations/supabase/client';

const spaceIdCache = new Map<string, string>();

export async function getCurrentSpaceId(userId: string): Promise<string> {
  const cached = spaceIdCache.get(userId);

  if (cached) {
    return cached;
  }

  const { data, error } = await supabase
    .from('space_members')
    .select('space_id')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data?.space_id) {
    throw new Error('Nao foi possivel localizar o espaco compartilhado deste usuario.');
  }

  spaceIdCache.set(userId, data.space_id);
  return data.space_id;
}

export function clearSpaceCache() {
  spaceIdCache.clear();
}
