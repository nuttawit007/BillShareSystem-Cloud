// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname === '/') {
		throw redirect(307, '/login');
	}
	return resolve(event);
};
