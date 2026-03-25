import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dtxhofjsbcbdffevuhva.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0eGhvZmpzYmNiZGZmZXZ1aHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NDI2MDYsImV4cCI6MjA5MDAxODYwNn0.X0wKJcd91nc96QD3kqI3j6dm7mN7HeF3JsWW5uhwQrM";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey);
