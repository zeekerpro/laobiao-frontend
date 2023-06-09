import { writable } from 'svelte/store';

const theme = writable<string>();

export default theme;
