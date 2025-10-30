<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex min-h-screen flex-col items-center">
	<section class="w-full">
		{@render children()}
	</section>
</main>
