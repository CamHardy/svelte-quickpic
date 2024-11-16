import { writable } from 'svelte/store';

/**
 * @template T
 * @param {string} key - The key to store in localStorage
 * @param {T} initialValue - The initial value for the store
 */
export function useLocalStorage(key, initialValue) {
  // Initialize store with the value from localStorage or use initial value
  const storedValue = typeof window !== "undefined"
    ? window.localStorage.getItem(key)
    : null;
  
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  const store = writable(initial);

  // Subscribe to store changes and update localStorage accordingly
  store.subscribe((value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
}
