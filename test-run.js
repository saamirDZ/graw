import { getSupabase, getAdminPassword } from './src/lib/server/supabase.js';
console.log("Supabase:", !!getSupabase());
console.log("Admin:", getAdminPassword());
