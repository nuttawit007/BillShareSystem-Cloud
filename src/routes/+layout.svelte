<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="flex min-h-screen flex-col items-center">
	<section class="max-w-4xl w-full">
		{@render children()}
	</section>
</main>
