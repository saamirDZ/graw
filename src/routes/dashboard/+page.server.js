// @ts-nocheck
import { env } from '$env/dynamic/private';
import { getAdminPassword } from '#lib/server/supabase.js';
import { getSupabase } from '#lib/server/supabase.js';
import { fail } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

export async function load({ cookies }) {
    const auth = cookies.get('admin_auth');
    if (auth !== getAdminPassword()) {
        return { authenticated: false };
    }

    const { data: products } = await getSupabase().from('products').select('*').order('name');
    const { data: orders } = await getSupabase().from('orders').select('*').order('created_at', { ascending: false });

    return {
        authenticated: true,
        products: products || [],
        orders: orders || []
    };
}

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const password = data.get('password');
        
        if (password === getAdminPassword()) {
            cookies.set('admin_auth', password, { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 });
            return { success: true };
        }
        return fail(401, { error: 'Invalid password' });
    },
    logout: async ({ cookies }) => {
        cookies.delete('admin_auth', { path: '/' });
        return { success: true };
    },
    addProduct: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id') || data.get('name').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const name = data.get('name');
        const category = data.get('category');
        const price = parseFloat(data.get('price'));
        const water = data.get('water');
        const size = data.get('size');
        const imageFile = data.get('image');
        
        let img = '';
        if (imageFile && imageFile.size > 0) {
            const ext = imageFile.name.split('.').pop();
            const filename = `${id}-${uuidv4()}.${ext}`;
            const { error: uploadError } = await getSupabase().storage.from('products').upload(filename, imageFile);
            if (uploadError) {
                return fail(500, { error: 'Image upload failed: ' + uploadError.message });
            }
            const { data: { publicUrl } } = getSupabase().storage.from('products').getPublicUrl(filename);
            img = publicUrl;
        } else {
            // fallback image if none provided
            img = 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=88';
        }

        const { error } = await getSupabase().from('products').insert({
            id, name, category, price, water, size, img
        });

        if (error) {
            return fail(500, { error: 'Failed to add product: ' + error.message });
        }
        return { success: true };
    },
    removeProduct: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        const { error } = await getSupabase().from('products').delete().eq('id', id);
        if (error) {
            return fail(500, { error: 'Failed to remove product' });
        }
        return { success: true };
    }
};
