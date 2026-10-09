// @ts-nocheck
import { getSupabase } from '#lib/server/supabase.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const name = data.get('name');
        const email = data.get('email');
        const phone = data.get('phone');
        const address = data.get('address');
        const itemsStr = data.get('items');
        const total = parseFloat(data.get('total'));

        if (!name || !email || !phone || !address || !itemsStr) {
            return fail(400, { error: 'All fields are required.' });
        }

        let items = [];
        try {
            items = JSON.parse(itemsStr);
        } catch (e) {
            return fail(400, { error: 'Invalid cart items.' });
        }
        
        if (items.length === 0) {
            return fail(400, { error: 'Cart is empty.' });
        }

        const { error: dbError } = await getSupabase().from('orders').insert({
            name, email, phone, address, items, total
        });

        if (dbError) {
            console.error('Order error:', dbError);
            return fail(500, { error: 'Failed to place order. Please try again later.' });
        }

        throw redirect(303, '/checkout/success');
    }
};
