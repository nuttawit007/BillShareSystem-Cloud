<script lang="ts">
	import '../../app.css';
	import Button from '$lib/components/ui/button/button.svelte';
	import { username } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let { children } = $props();

	const logout = () => {
		username.set(null);
		console.log('Logging out');
		if (browser) localStorage.removeItem('username');
		goto('/login');
	};
</script>

<main
	class="flex min-h-screen flex-col items-center pt-4"
>
	<section class="w-full max-w-4xl">
		<nav
			class="mb-4 flex w-full items-center justify-between rounded-xl
                border border-violet-100 bg-white/90 px-6 py-4 shadow-md
                shadow-violet-100/60 backdrop-blur-sm md:px-10"
		>
			<a href="/bill">
				<h1 class="text-xl font-semibold tracking-tight text-slate-900">BillShareSystem</h1>
			</a>
			<div class="flex items-center gap-3">
				<Button>{$username ?? 'username'}</Button>
				<button
					type="button"
					onclick={logout}
					class="cursor-pointer rounded-md bg-violet-600 px-4
                    py-[5px] text-white hover:bg-violet-700
                    focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:outline-none"
				>
					Logout
				</button>
			</div>
		</nav>
		{@render children()}
	</section>
</main>
