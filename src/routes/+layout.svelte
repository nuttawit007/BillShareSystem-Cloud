<script lang="ts">
	import '../app.css';
	import Button from '$lib/components/ui/button/button.svelte'; 

	let { children } = $props();
</script>

<main class="flex min-h-screen flex-col items-center pt-4">
	<section class="max-w-4xl w-full">
		<nav class="flex w-full items-center justify-between bg-gray-400 px-10 py-4 rounded-lg mb-4">
			<h1 class="text-xl">BillShareSystem</h1>
			<Button>username</Button>
		</nav>
		{@render children()}
	</section>
</main>
