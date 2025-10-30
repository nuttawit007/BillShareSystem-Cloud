import { writable } from 'svelte/store';

export const username = writable<string | null>(null);

if (typeof localStorage !== 'undefined') {
	const saved = localStorage.getItem('username');
	if (saved) username.set(saved);

	username.subscribe((v) => {
		if (v == null) localStorage.removeItem('username');
		else localStorage.setItem('username', v);
	});
}
