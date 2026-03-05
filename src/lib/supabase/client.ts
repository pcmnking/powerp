import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://beuywofzqydshjornwvf.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJldXl3b2Z6cXlkc2hqb3Jud3ZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDk0OTEsImV4cCI6MjA4ODI4NTQ5MX0.oj5O3BW_2c5i-P6QlqZnc3QdqOPab7bLIbvn4BgndlE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
