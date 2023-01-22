import { createClient } from '@supabase/supabase-js';

import { Database } from './database.types';

export const supabase = createClient<Database>(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY);
