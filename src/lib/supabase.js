// @ts-nocheck
import { createClient } from '@supabase/supabase-js'

export function createPublicClient(url, key) {
  return createClient(url, key)
}
