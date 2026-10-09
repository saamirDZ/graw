// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';
import WebSocket from 'ws';
import * as dotenv from 'dotenv';

if (typeof process !== 'undefined') {
    dotenv.config(); // Ensure local .env is loaded into process.env if SvelteKit misses it
}

if (typeof globalThis.WebSocket === 'undefined') {
    globalThis.WebSocket = WebSocket;
}

let client = null;
let _adminPassword = null;

export function getSupabase() {
    if (!client) {
        const url = env.SUPABASE_URL || (typeof process !== 'undefined' ? process.env.SUPABASE_URL : undefined);
        const key = env.SUPABASE_SERVICE_ROLE_KEY || (typeof process !== 'undefined' ? process.env.SUPABASE_SERVICE_ROLE_KEY : undefined);
        
        if (url && key) {
            client = createClient(url, key);
        } else {
            console.error("FATAL: Supabase credentials missing! URL:", !!url, "KEY:", !!key);
            throw new Error("Supabase credentials missing!");
        }
    }
    return client;
}

export function getAdminPassword() {
    if (!_adminPassword) {
        _adminPassword = env.ADMIN_PASSWORD || (typeof process !== 'undefined' ? process.env.ADMIN_PASSWORD : undefined);
    }
    return _adminPassword;
}
