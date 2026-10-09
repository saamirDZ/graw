// @ts-nocheck
import { getProducts } from '#lib/server/db.js';

export async function load() {
    const products = await getProducts('men');
    return { products };
}
