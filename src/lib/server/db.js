// @ts-nocheck
import { getSupabase } from './supabase.js';

export async function getProducts(category) {
    let query = getSupabase().from('products').select('*');
    if (category) {
        query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }
    return data;
}

export async function getProduct(id) {
    const { data, error } = await getSupabase().from('products').select('*').eq('id', id).single();
    if (error) {
        console.error('Error fetching product:', error);
        return null;
    }
    return data;
}
