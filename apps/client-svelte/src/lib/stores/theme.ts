import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const defaultValue = 'light';
// @ts-ignore
const initialValue = browser ? localStorage.getItem('theme') ?? defaultValue : defaultValue;


// todo
const theme = writable<string>(initialValue);

theme.subscribe((value) => {
  if (browser) {
    // @ts-ignore
    localStorage.setItem('theme', value);
  }
});

export default theme;
