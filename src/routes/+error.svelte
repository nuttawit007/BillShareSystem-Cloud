<script>
	import { page } from '$app/state';
</script>

<section class="h-full w-full">
	<h1>ERROR</h1>
	<p>{page.error?.message}</p>
	<a href="/">BACK</a>
</section>
