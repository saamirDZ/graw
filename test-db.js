import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config()
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
async function test() {
  const { data, error } = await supabase.from('products').select('*').limit(1)
  console.log('Products:', error ? error.message : 'Exists, rows: ' + data.length)
  const { data: d2, error: e2 } = await supabase.from('orders').select('*').limit(1)
  console.log('Orders:', e2 ? e2.message : 'Exists, rows: ' + d2.length)
}
test()
