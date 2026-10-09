// @ts-nocheck
import { writable } from 'svelte/store';
import { browser } from '$app/env';

const initialCart = browser ? JSON.parse(localStorage.getItem('graw-storeCart') || '[]') : [];
export const cart = writable(initialCart);

if (browser) {
    cart.subscribe((value) => {
        localStorage.setItem('graw-storeCart', JSON.stringify(value));
    });
}
