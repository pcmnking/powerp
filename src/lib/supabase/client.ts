import { createClient } from '@supabase/supabase-js';

// 使用預留佔位符，防止 Vercel 構建時因為缺少環境變數而崩潰
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
