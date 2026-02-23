import { createClient } from '@supabase/supabase-js';
import { authConfig } from './authConfig';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	console.error(
		'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file.'
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, authConfig);