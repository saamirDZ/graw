// @ts-nocheck
import { getProduct } from '#lib/server/db.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const product = await getProduct(params.id);
    if (!product) {
        throw error(404, 'Product not found');
    }
    return { product };
}
