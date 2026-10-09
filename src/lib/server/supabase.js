// @ts-nocheck
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import WebSocket from 'ws';

if (typeof globalThis.WebSocket === 'undefined') {
    globalThis.WebSocket = WebSocket;
}

let client = null;
let _adminPassword = null;

function loadEnv() {
    let envObj = {};
    try {
        const envContent = fs.readFileSync('/home/ramy/Code/repos/graw/.env', 'utf-8');
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                envObj[match[1].trim()] = match[2].trim();
            }
        });
    } catch (err) {
        console.error("Critical error reading .env file", err);
    }
    return envObj;
}

export function getSupabase() {
    if (!client) {
        const envVars = loadEnv();
        const url = envVars.SUPABASE_URL;
        const key = envVars.SUPABASE_SERVICE_ROLE_KEY;
        
        if (url && key) {
            client = createClient(url, key);
        } else {
            console.error("FATAL: Supabase credentials missing! URL:", !!url, "KEY:", !!key);
            // Fallback just in case
            throw new Error("Supabase credentials missing!");
        }
    }
    return client;
}

export function getAdminPassword() {
    if (!_adminPassword) {
        const envVars = loadEnv();
        _adminPassword = envVars.ADMIN_PASSWORD;
    }
    return _adminPassword;
}
